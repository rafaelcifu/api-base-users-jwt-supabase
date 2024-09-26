import { Module } from "@nestjs/common";
import { AvatarController } from "./avatar-upload.controller";
import { UploadService } from "./avatar-upload.service";
import { SupabaseService } from "../supabase/supabase.service"; // If using Supabase service

@Module({
  imports: [],
  controllers: [AvatarController],
  providers: [UploadService, SupabaseService], // Provide services
})
export class AvatarModule {}
