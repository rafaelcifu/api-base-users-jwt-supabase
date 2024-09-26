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
exports.LocalUserGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let LocalUserGuard = class LocalUserGuard {
    constructor(userService) {
        this.userService = userService;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user ID is available in the request
            if (!userId) {
                return next(); // If no user in the request, continue to the next middleware
            }
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "Error validating user" });
            }
            next(); // User found, continue to the next middleware
        });
    }
};
exports.LocalUserGuard = LocalUserGuard;
exports.LocalUserGuard = LocalUserGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LocalUserGuard);
//# sourceMappingURL=user-validation.guard.js.map