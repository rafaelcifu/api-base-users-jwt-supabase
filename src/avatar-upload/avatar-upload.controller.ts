import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException, // {{ edit_1 }}
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./avatar-upload.service";
import { UseGuards } from "@nestjs/common";
import { Multer } from "multer";

@Controller("avatar")
@UseGuards()
export class AvatarController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body("companyId") companyId: string
  ) {
    console.log("File received:", file);
    console.log("Company ID received:", companyId);

    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    if (!companyId) {
      throw new BadRequestException("No companyId provided");
    }

    return this.uploadService.uploadAvatar(file, companyId);
  }
}
