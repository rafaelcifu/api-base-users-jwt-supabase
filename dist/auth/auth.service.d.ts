import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
export declare class AuthService {
    private userService;
    private prisma;
    private supabase;
    constructor(userService: UserService, prisma: PrismaService);
    signUp(email: string, password: string, name: string): Promise<{
        message: string;
        user: {
            name: string | null;
            id: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            supabaseId: string;
        };
    }>;
    private createUserProvider;
    private updateCompanyUserStatus;
    private sendWelcomeEmail;
    signIn(email: string, password: string): Promise<{
        user: import("@supabase/supabase-js").AuthUser;
        session: import("@supabase/supabase-js").AuthSession;
        weakPassword?: import("@supabase/supabase-js").WeakPassword;
    }>;
    getUser(jwt: string): Promise<import("@supabase/supabase-js").AuthUser>;
}
