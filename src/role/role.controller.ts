import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./create-role.dto";
import { UpdateRoleDto } from "./update-role.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("roles")
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  createRole(@Body() data: CreateRoleDto) {
    return this.roleService.createRole(data);
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Get(":id")
  getRoleById(@Param("id") id: string) {
    return this.roleService.getRoleById(id);
  }

  @Put(":id")
  updateRole(@Param("id") id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.updateRole(id, data);
  }

  @Delete(":id")
  deleteRole(@Param("id") id: string) {
    return this.roleService.deleteRole(id);
  }
}
