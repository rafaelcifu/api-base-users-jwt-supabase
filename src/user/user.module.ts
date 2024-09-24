import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthProviderModule } from "../auth-provider/auth-provider.module"; // Correct import
import { AuthModule } from "../auth/auth.module";
import { SupabaseModule } from "../supabase/supabase.module";
@Module({
  imports: [AuthModule], // Import AuthModule to access SUPABASE_CLIENT
  controllers: [UserController],
  providers: [UserService, PrismaService], // Register UserService and PrismaService
  exports: [UserService],
})
export class UserModule {}
