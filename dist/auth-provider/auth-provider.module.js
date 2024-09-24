"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviderModule = void 0;
const common_1 = require("@nestjs/common");
const auth_provider_service_1 = require("./auth-provider.service");
const auth_provider_controller_1 = require("./auth-provider.controller");
const prisma_module_1 = require("../prisma/prisma.module"); // Ensure PrismaModule is imported
const auth_module_1 = require("../auth/auth.module");
let AuthProviderModule = class AuthProviderModule {
};
exports.AuthProviderModule = AuthProviderModule;
exports.AuthProviderModule = AuthProviderModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule], // PrismaModule must be imported here
        providers: [auth_provider_service_1.AuthProviderService],
        controllers: [auth_provider_controller_1.AuthProviderController],
        exports: [auth_provider_service_1.AuthProviderService],
    })
], AuthProviderModule);
//# sourceMappingURL=auth-provider.module.js.map