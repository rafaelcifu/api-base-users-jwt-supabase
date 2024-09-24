import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
