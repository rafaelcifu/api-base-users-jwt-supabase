import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{
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
    getUserByEmail(email: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        supabaseId: string;
    } | null>;
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
    updateUserProfile(id: string, updateUserProfileDto: UpdateUserProfileDto): Promise<{
        id: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
