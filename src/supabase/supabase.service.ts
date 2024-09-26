import { Injectable, BadRequestException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Express } from "express";

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!; // Use service key for secure server-side operations
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Method to get the Supabase client instance
  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Method to get existing avatar for a company
  async getCompanyAvatar(companyId: string) {
    const { data, error } = await this.supabase
      .from("CompanyAvatar") // Use the correct table name
      .select("fileName")
      .eq("companyId", companyId)
      .single();

    if (error && error.code !== "PGRST116") {
      // Ignore "No rows found" error
      throw new BadRequestException(
        `Failed to fetch existing avatar: ${error.message}`
      );
    }

    return data; // Return existing avatar data
  }

  // Method to upload a new avatar
  async uploadAvatar(file: Express.Multer.File, companyId: string) {
    const fileName = `${companyId}-${Date.now()}-${file.originalname}`;

    // Upload the file to the storage bucket
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from("companyAvatars")
      .upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    // Check for upload error
    if (uploadError) {
      return { error: uploadError }; // Return the error if it exists
    }

    // Get the public URL for the uploaded file
    const { data } = this.supabase.storage
      .from("companyAvatars")
      .getPublicUrl(fileName);

    // Save avatar metadata to the database
    await this.supabase
      .from("CompanyAvatar") // Insert into the new table
      .insert({
        companyId,
        fileName,
        publicUrl: data.publicUrl,
      });

    // Return the public URL and fileName
    return {
      fileName,
      publicUrl: data.publicUrl, // Directly accessing publicUrl from data
    };
  }
  // Method to delete an avatar from the storage bucket
  async deleteAvatar(fileName: string) {
    const { error } = await this.supabase.storage
      .from("companyAvatars") // Ensure this matches your storage bucket name
      .remove([fileName]); // Remove the file with the given fileName

    if (error) {
      throw new Error(`Failed to delete avatar: ${error.message}`);
    }

    return { message: "Avatar deleted successfully" };
  }
}
