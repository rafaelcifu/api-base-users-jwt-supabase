import { Injectable, BadRequestException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service"; // Import SupabaseService
import * as crypto from "crypto";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

@Injectable()
export class UploadService {
  private prisma: PrismaClient; // Add this line

  constructor(private readonly supabaseService: SupabaseService) {
    this.prisma = new PrismaClient(); // Initialize prisma
  }

  async uploadAvatar(file: Express.Multer.File, companyId: string) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    if (!companyId) {
      throw new BadRequestException("No companyId provided");
    }

    // Step 1: Check for existing image
    const existingImage = await this.supabaseService.getCompanyAvatar(
      companyId
    );

    if (existingImage) {
      // Step 2: Delete existing image
      const { message } = await this.supabaseService.deleteAvatar(
        existingImage.fileName
      );
      // Handle the message instead of error
      if (message) {
        // ... handle the message accordingly ...
      }
    }

    // Step 3: Upload new image
    const {
      fileName,
      publicUrl,
      error: uploadError,
    } = await this.supabaseService.uploadAvatar(file, companyId);

    if (uploadError) {
      throw new BadRequestException(`Upload error: ${uploadError.message}`);
    }

    // Step 4: Update the CompanyProfile with the new avatar URL
    await this.prisma.companyProfile.update({
      where: { companyId },
      data: { avatarUrl: publicUrl },
    });

    await this.prisma.companyAvatar.create({
      data: {
        companyId,
        fileName,
        publicUrl,
      },
    });

    return {
      message: "Avatar uploaded successfully",
      fileName,
      publicUrl,
    };
  }
}
