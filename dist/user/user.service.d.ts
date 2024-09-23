import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, password: string | null, providerId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
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
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserPassword(userId: string, newHashedPassword: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        passwordHash: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
