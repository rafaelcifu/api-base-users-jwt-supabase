"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const app_controller_1 = require("./app.controller");
const role_module_1 = require("./role/role.module");
const auth_provider_module_1 = require("./auth-provider/auth-provider.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }), // Make .env variables globally available
            prisma_module_1.PrismaModule,
            role_module_1.RoleModule,
            auth_provider_module_1.AuthProviderModule,
            user_module_1.UserModule, // Import the Prisma module here
        ],
        controllers: [app_controller_1.AppController], // Register the AppController here
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map