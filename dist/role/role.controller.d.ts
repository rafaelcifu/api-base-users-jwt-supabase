import { RoleService } from "./role.service";
import { CreateRoleDto } from "./create-role.dto";
import { UpdateRoleDto } from "./update-role.dto";
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    createRole(data: CreateRoleDto): Promise<{
        name: string;
        id: string;
    }>;
    getRoles(): Promise<{
        name: string;
        id: string;
    }[]>;
    getRoleById(id: string): Promise<{
        name: string;
        id: string;
    } | null>;
    updateRole(id: string, data: UpdateRoleDto): Promise<{
        name: string;
        id: string;
    }>;
    deleteRole(id: string): Promise<{
        name: string;
        id: string;
    }>;
}
