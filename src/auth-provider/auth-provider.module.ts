import { Module } from "@nestjs/common";
import { AuthProviderService } from "./auth-provider.service";
import { AuthProviderController } from "./auth-provider.controller";
import { PrismaModule } from "../prisma/prisma.module"; // Ensure PrismaModule is imported

@Module({
  imports: [PrismaModule], // PrismaModule must be imported here
  providers: [AuthProviderService],
  controllers: [AuthProviderController],
})
export class AuthProviderModule {}
