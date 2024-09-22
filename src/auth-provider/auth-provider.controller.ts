import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { AuthProviderService } from "./auth-provider.service";
import { CreateAuthProviderDto } from "./create-auth-provider.dto";
import { UpdateAuthProviderDto } from "./update-auth-provider.dto";

@Controller("auth-providers")
export class AuthProviderController {
  constructor(private authProviderService: AuthProviderService) {}

  @Post()
  createAuthProvider(@Body() data: CreateAuthProviderDto) {
    return this.authProviderService.createAuthProvider(data);
  }

  @Get()
  getAuthProviders() {
    return this.authProviderService.getAuthProviders();
  }

  @Get(":id")
  getAuthProviderById(@Param("id") id: string) {
    return this.authProviderService.getAuthProviderById(id);
  }

  @Put(":id")
  updateAuthProvider(
    @Param("id") id: string,
    @Body() data: UpdateAuthProviderDto
  ) {
    return this.authProviderService.updateAuthProvider(id, data);
  }

  @Delete(":id")
  deleteAuthProvider(@Param("id") id: string) {
    return this.authProviderService.deleteAuthProvider(id);
  }
}
