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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AvatarController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const avatar_upload_service_1 = require("./avatar-upload.service");
const common_2 = require("@nestjs/common");
let AvatarController = class AvatarController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadAvatar(file, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("File received:", file);
            console.log("Company ID received:", companyId);
            if (!file) {
                throw new common_1.BadRequestException("No file uploaded");
            }
            if (!companyId) {
                throw new common_1.BadRequestException("No companyId provided");
            }
            return this.uploadService.uploadAvatar(file, companyId);
        });
    }
};
exports.AvatarController = AvatarController;
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)("companyId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AvatarController.prototype, "uploadAvatar", null);
exports.AvatarController = AvatarController = __decorate([
    (0, common_1.Controller)("avatar"),
    (0, common_2.UseGuards)(),
    __metadata("design:paramtypes", [avatar_upload_service_1.UploadService])
], AvatarController);
//# sourceMappingURL=avatar-upload.controller.js.map