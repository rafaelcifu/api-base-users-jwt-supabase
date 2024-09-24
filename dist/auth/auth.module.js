"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const auth_provider_service_1 = require("../auth-provider/auth-provider.service");
const supabase_service_1 = require("../supabase/supabase.service");
const supabase_js_1 = require("@supabase/supabase-js");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            {
                provide: "SUPABASE_CLIENT",
                useFactory: () => {
                    const url = process.env.SUPABASE_URL;
                    const key = process.env.SUPABASE_PUBLIC_KEY;
                    if (!url || !key) {
                        throw new Error("supabaseUrl and supabaseKey are required.");
                    }
                    return new supabase_js_1.SupabaseClient(url, key);
                },
            },
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            supabase_service_1.SupabaseService,
            auth_service_1.AuthService,
            auth_provider_service_1.AuthProviderService,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: ["SUPABASE_CLIENT", supabase_service_1.SupabaseService, auth_service_1.AuthService], // Export the SUPABASE_CLIENT and SupabaseService
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map