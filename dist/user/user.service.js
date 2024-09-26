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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_js_1 = require("@supabase/supabase-js"); // Ensure SupabaseClient is imported
const supabase_service_1 = require("../supabase/supabase.service");
let UserService = class UserService {
    constructor(prismaService, supabaseService, supabaseClient // Inject SUPABASE_CLIENT
    ) {
        this.prismaService = prismaService;
        this.supabaseService = supabaseService;
        this.supabaseClient = supabaseClient;
        this.supabase = supabaseClient; // Initialize Supabase
    }
    // Create a new user
    createUser(email, password, providerId, name, phone, supabaseId // Pass supabaseId here
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const supabase = this.supabaseService.getClient();
            // Check if the user already exists in your own database
            const existingUser = yield this.prismaService.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException("User already exists with this email");
            }
            // Create the user in your own database
            const newUser = yield this.prismaService.user.create({
                data: {
                    email,
                    name: name || "User", // Save the name directly in the User table with a fallback to 'User'
                    supabaseId: supabaseId, // Use the passed supabaseId
                    profile: phone ? { create: { phone } } : undefined, // Only create profile if phone is provided
                },
            });
            // Link the user to the provider in your own database
            yield this.prismaService.userProvider.create({
                data: {
                    userId: newUser.id,
                    providerId,
                    providerUserId: supabaseId !== null && supabaseId !== void 0 ? supabaseId : email, // Use the supabaseId if available, else use email
                },
            });
            return newUser;
        });
    }
    findOrCreateOAuthUser(email, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user already exists in your database
            let user = yield this.prismaService.user.findUnique({ where: { email } });
            if (!user) {
                // If not, create a new user with just the email and providerId
                user = yield this.prismaService.user.create({
                    data: {
                        email,
                        supabaseId: email,
                        providers: {
                            create: {
                                providerId,
                                providerUserId: email, // Store the email as providerUserId
                            },
                        },
                    },
                });
            }
            return user;
        });
    }
    // Get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.user.findMany();
        });
    }
    // Get user by ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return user;
        });
    }
    // Get user by email
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({
                where: { email },
            });
            return user; // Returns null if no user is found
        });
    }
    // Update user
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return this.prismaService.user.update({
                where: { id },
                data: updateUserDto,
            });
        });
    }
    // Delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user in your local database
            const user = yield this.prismaService.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            // Delete the user in your local database
            yield this.prismaService.user.delete({ where: { id } });
            console.log(`User with ID ${id} deleted from local database`);
            return { message: "User deleted successfully" };
        });
    }
    // Change password using Supabase
    changePassword(id, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const supabase = this.supabaseService.getClient();
            const { currentPassword, newPassword } = changePasswordDto;
            // Check if the user exists in your own database
            const user = yield this.prismaService.user.findUnique({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            // Check if the user exists in Supabase and validate the current password
            const { data: loginData, error: loginError } = yield supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });
            if (loginError) {
                throw new common_1.BadRequestException("Current password is incorrect");
            }
            // Update password in Supabase
            const { error: updateError } = yield supabase.auth.updateUser({
                password: newPassword,
            });
            if (updateError) {
                throw new common_1.BadRequestException("Error changing password: " + updateError.message);
            }
            return { message: "Password updated successfully" };
        });
    }
    // Update user profile
    updateUserProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user exists
            const user = yield this.prismaService.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            // Update or create the profile
            return this.prismaService.userProfile.upsert({
                where: { userId: userId },
                update: Object.assign({}, profileData),
                create: Object.assign({ userId: userId }, profileData),
            });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)("SUPABASE_CLIENT")),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService,
        supabase_js_1.SupabaseClient // Inject SUPABASE_CLIENT
    ])
], UserService);
//# sourceMappingURL=user.service.js.map