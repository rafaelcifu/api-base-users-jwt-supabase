import { PrismaService } from "../prisma/prisma.service";
import { CreateRoleDto } from "./create-role.dto";
import { UpdateRoleDto } from "./update-role.dto";
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    createRole(data: CreateRoleDto): Promise<{
        id: string;
        name: string;
    }>;
    getRoles(): Promise<{
        id: string;
        name: string;
    }[]>;
    getRoleById(id: string): Promise<{
        id: string;
        name: string;
    } | null>;
    updateRole(id: string, data: UpdateRoleDto): Promise<{
        id: string;
        name: string;
    }>;
    deleteRole(id: string): Promise<{
        id: string;
        name: string;
    }>;
}
