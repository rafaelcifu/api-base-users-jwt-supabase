import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SupabaseModule } from "../supabase/supabase.module";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { AuthProviderService } from "../auth-provider/auth-provider.service";
import { SupabaseService } from "../supabase/supabase.service";
import { SupabaseClient } from "@supabase/supabase-js";

@Module({
  imports: [],
  providers: [
    {
      provide: "SUPABASE_CLIENT",
      useFactory: () => {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_PUBLIC_KEY;

        if (!url || !key) {
          throw new Error("supabaseUrl and supabaseKey are required.");
        }

        return new SupabaseClient(url, key);
      },
    },
    UserService,
    PrismaService,
    SupabaseService,
    AuthService,
    AuthProviderService,
  ],
  controllers: [AuthController],
  exports: ["SUPABASE_CLIENT", SupabaseService, AuthService], // Export the SUPABASE_CLIENT and SupabaseService
})
export class AuthModule {}
