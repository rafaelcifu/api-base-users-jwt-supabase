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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_js_1 = require("@supabase/supabase-js");
const mail_1 = __importDefault(require("@sendgrid/mail")); // Importing as default
let AuthService = class AuthService {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY);
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY); // Setting API key correctly
    }
    signUp(email, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Step 1: Check if the user already exists in your own database
            const existingUser = yield this.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException("User already exists in the database.");
            }
            // Step 2: Create the user in Supabase
            const { data, error } = yield this.supabase.auth.signUp({
                email,
                password,
            });
            if (error)
                throw new common_1.BadRequestException("Supabase error: " + error.message);
            const supabaseUser = data.user;
            // Validate that supabaseUser.id is defined
            if (!(supabaseUser === null || supabaseUser === void 0 ? void 0 : supabaseUser.id)) {
                throw new Error("Supabase user ID is undefined");
            }
            // Step 3: Create user in your own database with the name included
            let newUser;
            try {
                newUser = yield this.prisma.user.create({
                    data: {
                        email,
                        name,
                        supabaseId: supabaseUser.id, // Guaranteed to be a string now
                    },
                });
                // Step 4: Link the user with the provider (Email in this case)
                yield this.createUserProvider(newUser.id, "8308ea76-9e2d-40e4-86cd-d61a48b02d21"); // Use your provider ID
                // Step 5: Update the CompanyUser entry with the new userId and status 'active'
                yield this.updateCompanyUserStatus(email, newUser.id);
                // Step 6: Send a welcome email using SendGrid with name from User
                yield this.sendWelcomeEmail(email, newUser.name || "User", newUser.id);
            }
            catch (err) {
                console.error("Error during user sign-up or email sending:", err);
                // Log error to the database using Prisma
                try {
                    yield this.prisma.log.create({
                        data: {
                            type: "error",
                            service: "UserService",
                            message: "User sign-up or email sending failed",
                            email: (newUser === null || newUser === void 0 ? void 0 : newUser.email) || email,
                            metadata: {
                                userId: (newUser === null || newUser === void 0 ? void 0 : newUser.id) || "unknown",
                                error: err.message,
                                stack: err.stack,
                            },
                        },
                    });
                }
                catch (loggingError) {
                    console.error("Failed to log the error:", loggingError);
                }
                throw new common_1.BadRequestException("User creation or email sending failed.");
            }
            return {
                message: `User created successfully. A welcome email has been sent to ${email}.`,
                user: newUser,
            };
        });
    }
    // Method to link user with provider in the UserProvider table
    createUserProvider(userId, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.userProvider.create({
                data: {
                    userId,
                    providerId,
                },
            });
        });
    }
    // Method to update CompanyUser status after user signup
    updateCompanyUserStatus(email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.companyUser.updateMany({
                where: {
                    email: email,
                    status: "invited",
                },
                data: {
                    userId: userId,
                    status: "active",
                },
            });
        });
    }
    // Helper method to send a welcome email
    sendWelcomeEmail(email, name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                to: email,
                from: "contato@pmakers.com.br", // Your verified sender email
                templateId: "d-f4e143892c59480da4aa899e476defed", // Your SendGrid dynamic template ID
                dynamicTemplateData: {
                    firstName: name,
                },
            };
            console.log("Sending email with data:", msg); // Log the message data
            try {
                yield mail_1.default.send(msg);
                console.log("Welcome email sent successfully");
            }
            catch (sendGridError) {
                console.error("Error sending welcome email:", sendGridError);
                // Log the error to the database using Prisma
                try {
                    yield this.prisma.log.create({
                        data: {
                            type: "error",
                            service: "SendGrid",
                            message: "Failed to send welcome email",
                            email,
                            metadata: {
                                userId,
                                error: sendGridError.message,
                                stack: sendGridError.stack,
                            },
                        },
                    });
                }
                catch (loggingError) {
                    console.error("Failed to log the email error:", loggingError);
                }
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw new Error(error.message);
            return data;
        });
    }
    getUser(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase.auth.getUser(jwt);
            if (error)
                throw new Error(error.message);
            return data.user;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map