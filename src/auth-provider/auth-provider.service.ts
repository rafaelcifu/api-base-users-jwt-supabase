import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAuthProviderDto } from "./create-auth-provider.dto";
import { UpdateAuthProviderDto } from "./update-auth-provider.dto";

@Injectable()
export class AuthProviderService {
  constructor(private prisma: PrismaService) {}

  async createAuthProvider(data: CreateAuthProviderDto) {
    return this.prisma.authProvider.create({ data });
  }

  async getAuthProviders() {
    return this.prisma.authProvider.findMany();
  }

  async getAuthProviderById(id: string) {
    return this.prisma.authProvider.findUnique({ where: { id } });
  }

  async updateAuthProvider(id: string, data: UpdateAuthProviderDto) {
    return this.prisma.authProvider.update({ where: { id }, data });
  }

  async deleteAuthProvider(id: string) {
    return this.prisma.authProvider.delete({ where: { id } });
  }
}
