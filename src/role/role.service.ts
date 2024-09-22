import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRoleDto } from "./create-role.dto";
import { UpdateRoleDto } from "./update-role.dto";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: CreateRoleDto) {
    return this.prisma.role.create({ data });
  }

  async getRoles() {
    return this.prisma.role.findMany();
  }

  async getRoleById(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async updateRole(id: string, data: UpdateRoleDto) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async deleteRole(id: string) {
    return this.prisma.role.delete({ where: { id } });
  }
}
