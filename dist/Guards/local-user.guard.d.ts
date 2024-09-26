import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
export declare class LocalUserGuard implements CanActivate {
    private userService;
    private jwtService;
    private reflector;
    constructor(userService: UserService, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
