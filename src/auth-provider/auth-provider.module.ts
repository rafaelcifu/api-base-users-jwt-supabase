import { Module } from "@nestjs/common";
import { AuthProviderService } from "./auth-provider.service";
import { AuthProviderController } from "./auth-provider.controller";
import { PrismaModule } from "../prisma/prisma.module"; // Ensure PrismaModule is imported
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule], // PrismaModule must be imported here
  providers: [AuthProviderService],
  controllers: [AuthProviderController],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
