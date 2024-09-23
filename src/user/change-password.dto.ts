import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    description: "Current password",
    example: "currentPassword123",
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: "New password, must be at least 6 characters",
    example: "newPassword456",
  })
  @IsString()
  @MinLength(6, { message: "New password must be at least 6 characters long" })
  newPassword: string;

  constructor(currentPassword: string, newPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}
