import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];
    if (!authHeader) return false;

    const jwt = authHeader.split(" ")[1];
    try {
      const user = await this.authService.getUser(jwt);
      request.user = user; // Attach user to request object
      return true;
    } catch (e) {
      return false;
    }
  }
}
