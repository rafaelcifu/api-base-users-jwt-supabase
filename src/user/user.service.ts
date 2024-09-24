import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";
import { User } from "@prisma/client"; // Adjust import based on your User model
import { SupabaseClient } from "@supabase/supabase-js"; // Ensure SupabaseClient is imported
import { SupabaseService } from "../supabase/supabase.service";

@Injectable()
export class UserService {
  // Add a property for Supabase
  private supabase: SupabaseClient; // Ensure SupabaseClient is imported

  constructor(
    private prismaService: PrismaService,
    private supabaseService: SupabaseService, // Inject SupabaseService
    @Inject("SUPABASE_CLIENT") private supabaseClient: SupabaseClient // Inject SUPABASE_CLIENT
  ) {
    this.supabase = supabaseClient; // Initialize Supabase
  }

  // Create a new user
  async createUser(
    email: string,
    password: string | null,
    providerId: string,
    name?: string,
    phone?: string,
    supabaseId?: string // Pass supabaseId here
  ) {
    const supabase = this.supabaseService.getClient();
    // Check if the user already exists in your own database
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException("User already exists with this email");
    }

    // Create the user in your own database
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        supabaseId: supabaseId as string, // Use the passed supabaseId
        profile: name || phone ? { create: { name, phone } } : undefined,
      },
    });

    // Link the user to the provider in your own database
    await this.prismaService.userProvider.create({
      data: {
        userId: newUser.id,
        providerId,
        providerUserId: supabaseId ?? email, // Use the supabaseId if available, else use email
      },
    });

    return newUser;
  }
  async findOrCreateOAuthUser(email: string, providerId: string) {
    // Check if user already exists in your database
    let user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      // If not, create a new user with just the email and providerId
      user = await this.prismaService.user.create({
        data: {
          email,
          supabaseId: email,
          providers: {
            create: {
              providerId,
              providerUserId: email, // Store the email as providerUserId
            },
          },
        },
      });
    }

    return user;
  }

  // Get all users
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }

  // Get user by ID
  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  // Get user by email
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user; // Returns null if no user is found
  }

  // Update user
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Delete user
  async deleteUser(id: string) {
    // Find the user in your local database
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Ensure user.supabaseId is not null before passing it
    if (user.supabaseId) {
      const { error } = await this.supabase.auth.admin.deleteUser(
        user.supabaseId
      );
      if (error) {
        throw new BadRequestException(`Supabase error: ${error.message}`);
      }
    }

    // Delete the user in your local database
    await this.prismaService.user.delete({ where: { id } });

    return { message: "User deleted successfully" };
  }

  // Change password using Supabase
  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const supabase = this.supabaseService.getClient();
    const { currentPassword, newPassword } = changePasswordDto;

    // Check if the user exists in your own database
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check if the user exists in Supabase and validate the current password
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

    if (loginError) {
      throw new BadRequestException("Current password is incorrect");
    }

    // Update password in Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      throw new BadRequestException(
        "Error changing password: " + updateError.message
      );
    }

    return { message: "Password updated successfully" };
  }

  // Update user profile
  async updateUserProfile(userId: string, profileData: UpdateUserProfileDto) {
    // Check if user exists
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Update or create the profile
    return this.prismaService.userProfile.upsert({
      where: { userId: userId },
      update: { ...profileData },
      create: { userId: userId, ...profileData },
    });
  }
}
