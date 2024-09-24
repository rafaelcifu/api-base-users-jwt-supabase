import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async createUser(
    email: string,
    password: string | null,
    providerId: string,
    name?: string,
    phone?: string
  ) {
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
        emailVerified: false,
        profile: name || phone ? { create: { name, phone } } : undefined,
      },
    });

    // Update CompanyUser entries for the user's email
    await this.prisma.companyUser.updateMany({
      where: { email: newUser.email, userId: null }, // Check for email with null userId
      data: { userId: newUser.id, status: "active" }, // Link to new userId and set status to active
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

  // change password
  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    // Find user by ID and include providers
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { providers: true }, // Include providers to validate
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    let cachedEmailProviderId: string | null = null;

    // Check if user has email provider
    if (!cachedEmailProviderId) {
      const provider = await this.prisma.authProvider.findFirst({
        where: {
          name: {
            in: ["email", "e-mail", "default", "mail", "email provider"],
            mode: "insensitive",
          },
        },
      });

      if (!provider) {
        throw new BadRequestException("Email provider not found");
      }

      cachedEmailProviderId = provider.id; // Cache the provider ID
    }

    const hasEmailProvider = user.providers.some(
      (provider) => provider.providerId === cachedEmailProviderId // Use the cached providerId
    );
    if (!hasEmailProvider) {
      throw new BadRequestException(
        "Password change is only applicable for email users"
      );
    }

    // Check if passwordHash is not null
    if (!user.passwordHash) {
      throw new BadRequestException("User has no password set");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password
    return this.prisma.user.update({
      where: { id },
      data: { passwordHash: hashedPassword },
    });
  }
  // Update user profile
  async updateUserProfile(userId: string, profileData: UpdateUserProfileDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Update or create the profile
    return this.prisma.userProfile.upsert({
      where: { userId: userId },
      update: { ...profileData },
      create: { userId: userId, ...profileData },
    });
  }
}
