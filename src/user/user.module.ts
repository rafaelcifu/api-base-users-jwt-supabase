import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service"; // Import PrismaService

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // Register UserService and PrismaService
})
export class UserModule {}
