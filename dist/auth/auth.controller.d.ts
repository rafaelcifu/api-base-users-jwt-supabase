import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
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
    signIn(body: {
        email: string;
        password: string;
    }): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    }>;
    getUser(authorization: string): Promise<import("@supabase/auth-js").User>;
}
