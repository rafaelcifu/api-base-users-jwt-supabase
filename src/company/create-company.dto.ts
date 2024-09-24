import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({ example: "My Company" })
  @IsString()
  name: string;

  @ApiProperty({ example: "https://example.com", required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: "00.000.000/0000-00", required: false })
  @IsString()
  @IsOptional()
  cnpj?: string;

  @ApiProperty({ example: "#ff5733", required: false })
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @ApiProperty({ example: "#3333ff", required: false })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiProperty({ example: "https://example.com/avatar.jpg", required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ example: "123 Main St, City, Country", required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: '{"twitter": "link", "linkedin": "link"}',
    required: false,
  })
  @IsOptional()
  socialMediaLinks?: object;

  @ApiProperty({ example: "This is a sample company bio.", required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    example: "12345",
    description: "User ID of the company creator",
  })
  @IsString()
  userId: string; // Add userId for the company creator

  constructor(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
  }
}
