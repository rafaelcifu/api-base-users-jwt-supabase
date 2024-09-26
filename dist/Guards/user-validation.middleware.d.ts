import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../user/user.service";
interface CustomRequest extends Request {
    user?: {
        id: string;
    };
}
export declare class ValidateUserMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: CustomRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
export {};
