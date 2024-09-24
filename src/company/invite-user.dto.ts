import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class InviteUserDto {
  @ApiProperty({ example: "user@example.com" })
  @IsString()
  email: string;

  @ApiProperty({ example: "company-id" })
  @IsString()
  companyId: string;

  @ApiProperty({ example: "role-id" })
  @IsString()
  roleId: string;

  constructor(email: string, companyId: string, roleId: string) {
    this.email = email;
    this.companyId = companyId;
    this.roleId = roleId;
  }
}
