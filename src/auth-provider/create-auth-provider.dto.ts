import { IsString } from "class-validator";

export class CreateAuthProviderDto {
  @IsString()
  name!: string; // e.g., 'google', 'github'
}
