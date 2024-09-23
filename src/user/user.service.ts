import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async createUser(email: string, password: string | null, providerId: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException("User already exists with this email");
    }

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    const emailProvider = await this.prisma.authProvider.findUnique({
      where: { name: "email" },
    });

    if (!emailProvider) {
      throw new Error("Email provider not found");
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        emailVerified: false, // Always false for email provider
      },
    });

    await this.prisma.userProvider.create({
      data: {
        userId: newUser.id,
        providerId: emailProvider.id, // Use fetched provider ID
        providerUserId: newUser.email,
      },
    });

    return newUser;
  }

  // Get all users
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // Get user by ID
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  // Get user by email
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { providers: true },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  // Update user
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Delete user
  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    // Verificar a senha atual
    if (!user.passwordHash) {
      throw new UnauthorizedException("Senha não definida para este usuário");
    }
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Senha atual incorreta");
    }

    // Hash da nova senha
    const newHashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10
    );

    // Atualizar a senha
    return this.prisma.user.update({
      where: { id },
      data: {
        passwordHash: newHashedPassword, // Correctly update only the passwordHash
      },
    });
  }

  // ... existing code ...

  async updateUserPassword(userId: string, newHashedPassword: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHashedPassword },
    });
  }
}
