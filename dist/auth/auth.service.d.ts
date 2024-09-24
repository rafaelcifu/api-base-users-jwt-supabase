import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
export declare class AuthService {
    private userService;
    private prisma;
    private emailRequestCount;
    private readonly EMAIL_LIMIT;
    private readonly TIME_FRAME;
    private lastRequestTime;
    private supabase;
    constructor(userService: UserService, prisma: PrismaService);
    signUp(email: string, password: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            supabaseId: string;
        };
    }>;
    signIn(email: string, password: string): Promise<{
        user: import("@supabase/supabase-js").AuthUser;
        session: import("@supabase/supabase-js").AuthSession;
        weakPassword?: import("@supabase/supabase-js").WeakPassword;
    }>;
    getUser(jwt: string): Promise<import("@supabase/supabase-js").AuthUser>;
}
