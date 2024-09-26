import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";
import { User } from "@prisma/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseService } from "../supabase/supabase.service";
export declare class UserService {
    private prismaService;
    private supabaseService;
    private supabaseClient;
    private supabase;
    constructor(prismaService: PrismaService, supabaseService: SupabaseService, // Inject SupabaseService
    supabaseClient: SupabaseClient);
    createUser(email: string, password: string | null, providerId: string, name?: string, phone?: string, supabaseId?: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    }>;
    findOrCreateOAuthUser(email: string, providerId: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    }>;
    getAllUsers(): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    }[]>;
    getUserById(id: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    }>;
    findUserByEmail(email: string): Promise<User | null>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    updateUserProfile(userId: string, profileData: UpdateUserProfileDto): Promise<{
        id: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
