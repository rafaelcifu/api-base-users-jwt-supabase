import { IsString, IsOptional } from "class-validator";

export class UpdateAuthProviderDto {
  @IsString()
  @IsOptional()
  name?: string; // Optional for updating only when needed
}
