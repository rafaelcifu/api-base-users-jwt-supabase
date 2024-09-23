import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user@example.com",
    description: "The email of the user",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, description: "The password of the user" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "google",
    description: "The provider ID of the user",
  })
  @IsString()
  providerId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  constructor(email: string, password: string, providerId: string) {
    this.email = email;
    this.password = password;
    this.providerId = providerId;
  }
}
