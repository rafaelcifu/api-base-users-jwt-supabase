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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service"); // Import SupabaseService
const client_1 = require("@prisma/client"); // Import PrismaClient
let UploadService = class UploadService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.prisma = new client_1.PrismaClient(); // Initialize prisma
    }
    uploadAvatar(file, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file) {
                throw new common_1.BadRequestException("No file uploaded");
            }
            if (!companyId) {
                throw new common_1.BadRequestException("No companyId provided");
            }
            // Step 1: Check for existing image
            const existingImage = yield this.supabaseService.getCompanyAvatar(companyId);
            if (existingImage) {
                // Step 2: Delete existing image
                const { message } = yield this.supabaseService.deleteAvatar(existingImage.fileName);
                // Handle the message instead of error
                if (message) {
                    // ... handle the message accordingly ...
                }
            }
            // Step 3: Upload new image
            const { fileName, publicUrl, error: uploadError, } = yield this.supabaseService.uploadAvatar(file, companyId);
            if (uploadError) {
                throw new common_1.BadRequestException(`Upload error: ${uploadError.message}`);
            }
            // Step 4: Update the CompanyProfile with the new avatar URL
            yield this.prisma.companyProfile.update({
                where: { companyId },
                data: { avatarUrl: publicUrl },
            });
            return {
                message: "Avatar uploaded successfully",
                fileName,
                publicUrl,
            };
        });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], UploadService);
//# sourceMappingURL=avatar-upload.service.js.map