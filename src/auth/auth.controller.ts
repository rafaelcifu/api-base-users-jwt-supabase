import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException("Email and password are required");
    }
    return this.authService.signUp(email, password);
  }

  @Post("signin")
  async signIn(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException("Email and password are required");
    }
    return this.authService.signIn(email, password);
  }

  @Get("me")
  async getUser(@Headers("Authorization") authorization: string) {
    if (!authorization) {
      throw new BadRequestException("Authorization header is missing");
    }
    const jwt = authorization.split(" ")[1];
    return this.authService.getUser(jwt);
  }
}
