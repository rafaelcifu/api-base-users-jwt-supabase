"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarModule = void 0;
const common_1 = require("@nestjs/common");
const avatar_upload_controller_1 = require("./avatar-upload.controller");
const avatar_upload_service_1 = require("./avatar-upload.service");
const supabase_service_1 = require("../supabase/supabase.service"); // If using Supabase service
let AvatarModule = class AvatarModule {
};
exports.AvatarModule = AvatarModule;
exports.AvatarModule = AvatarModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [avatar_upload_controller_1.AvatarController],
        providers: [avatar_upload_service_1.UploadService, supabase_service_1.SupabaseService], // Provide services
    })
], AvatarModule);
//# sourceMappingURL=avatar-upload.module.js.map