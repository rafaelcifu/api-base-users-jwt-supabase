import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, password: string | null, providerId: string, name?: string, phone?: string): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUserByEmail(email: string): Promise<{
        providers: {
            id: string;
            userId: string;
            providerUserId: string | null;
            providerId: string;
            createdAt: Date;
        }[];
    } & {
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        id: string;
        email: string;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserProfile(userId: string, profileData: UpdateUserProfileDto): Promise<{
        id: string;
        userId: string;
        name: string | null;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
