import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AppController } from "./app.controller";
import { RoleModule } from "./role/role.module";
import { AuthProviderModule } from "./auth-provider/auth-provider.module";
import { UserModule } from "./user/user.module";
import { CompanyModule } from "./company/company.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make .env variables globally available
    PrismaModule,
    RoleModule,
    AuthProviderModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
