import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AppController } from "./app.controller";
import { RoleModule } from './role/role.module';
import { AuthProviderModule } from './auth-provider/auth-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make .env variables globally available
    PrismaModule, RoleModule, AuthProviderModule, // Import the Prisma module here
  ],
  controllers: [AppController], // Register the AppController here
  providers: [],
})
export class AppModule {}
