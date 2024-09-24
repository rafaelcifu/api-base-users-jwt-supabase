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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const supabase_js_1 = require("@supabase/supabase-js");
let AuthService = class AuthService {
    constructor(userService, prisma // Add PrismaService for database operations
    ) {
        this.userService = userService;
        this.prisma = prisma;
        this.emailRequestCount = 0; // Track email requests
        this.EMAIL_LIMIT = 5; // Set your limit
        this.TIME_FRAME = 60000; // 1 minute in milliseconds
        this.lastRequestTime = Date.now();
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY);
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Reset rate limit counter logic...
            // Step 1: Check if the user already exists in your own database
            const existingUser = yield this.userService.findUserByEmail(email);
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
            // Step 3: Create user in your own database
            const newUser = yield this.userService.createUser(email, password, "8308ea76-9e2d-40e4-86cd-d61a48b02d21", // providerId for email
            undefined, // name, if available
            undefined, // phone, if available
            supabaseUser === null || supabaseUser === void 0 ? void 0 : supabaseUser.id // Pass supabaseId directly to user service
            );
            return { message: `User created successfully`, user: newUser };
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
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService // Add PrismaService for database operations
    ])
], AuthService);
//# sourceMappingURL=auth.service.js.map