"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Create a new user
    createUser(email, password, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException("User already exists with this email");
            }
            const passwordHash = password ? yield bcrypt.hash(password, 10) : null;
            const emailProvider = yield this.prisma.authProvider.findUnique({
                where: { name: "email" },
            });
            if (!emailProvider) {
                throw new Error("Email provider not found");
            }
            const newUser = yield this.prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    emailVerified: false, // Always false for email provider
                },
            });
            yield this.prisma.userProvider.create({
                data: {
                    userId: newUser.id,
                    providerId: emailProvider.id, // Use fetched provider ID
                    providerUserId: newUser.email,
                },
            });
            return newUser;
        });
    }
    // Get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany();
        });
    }
    // Get user by ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return user;
        });
    }
    // Get user by email
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email },
                include: { providers: true },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return user;
        });
    }
    // Update user
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
        });
    }
    // Delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return this.prisma.user.delete({ where: { id } });
        });
    }
    changePassword(id, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("Usuário não encontrado");
            }
            // Verificar a senha atual
            if (!user.passwordHash) {
                throw new common_1.UnauthorizedException("Senha não definida para este usuário");
            }
            const isPasswordValid = yield bcrypt.compare(changePasswordDto.currentPassword, user.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException("Senha atual incorreta");
            }
            // Hash da nova senha
            const newHashedPassword = yield bcrypt.hash(changePasswordDto.newPassword, 10);
            // Atualizar a senha
            return this.prisma.user.update({
                where: { id },
                data: {
                    passwordHash: newHashedPassword, // Correctly update only the passwordHash
                },
            });
        });
    }
    // ... existing code ...
    updateUserPassword(userId, newHashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.update({
                where: { id: userId },
                data: { passwordHash: newHashedPassword },
            });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map