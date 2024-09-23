import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateUserProfileDto {
  @ApiProperty({ description: "User name", example: "John Doe" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "User phone number", example: "+123456789" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: "User bio",
    example: "Software Developer at Company X",
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: "URL to user avatar",
    example: "https://example.com/avatar.jpg",
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
