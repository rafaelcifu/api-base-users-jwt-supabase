"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let SupabaseService = class SupabaseService {
    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY; // Use service key for secure server-side operations
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    // Method to get the Supabase client instance
    getClient() {
        return this.supabase;
    }
    // Method to get existing avatar for a company
    getCompanyAvatar(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase
                .from("CompanyAvatar") // Use the correct table name
                .select("fileName")
                .eq("companyId", companyId)
                .single();
            if (error && error.code !== "PGRST116") {
                // Ignore "No rows found" error
                throw new common_1.BadRequestException(`Failed to fetch existing avatar: ${error.message}`);
            }
            return data; // Return existing avatar data
        });
    }
    // Method to upload a new avatar
    uploadAvatar(file, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `${companyId}-${Date.now()}-${file.originalname}`;
            // Upload the file to the storage bucket
            const { data: uploadData, error: uploadError } = yield this.supabase.storage
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
            yield this.supabase
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
        });
    }
    // Method to delete an avatar from the storage bucket
    deleteAvatar(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield this.supabase.storage
                .from("companyAvatars") // Ensure this matches your storage bucket name
                .remove([fileName]); // Remove the file with the given fileName
            if (error) {
                throw new Error(`Failed to delete avatar: ${error.message}`);
            }
            return { message: "Avatar deleted successfully" };
        });
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map