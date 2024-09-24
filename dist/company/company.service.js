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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let CompanyService = class CompanyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createCompany(createCompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, website, cnpj, primaryColor, secondaryColor, avatarUrl, address, socialMediaLinks, bio, userId, } = createCompanyDto;
            let cachedAdminRoleId = null;
            // Fetch the Admin role dynamically with caching
            if (!cachedAdminRoleId) {
                const role = yield this.prisma.role.findFirst({
                    where: {
                        name: {
                            in: ["admin", "administrator", "admin user"],
                            mode: "insensitive",
                        },
                    },
                });
                if (!role) {
                    throw new common_2.BadRequestException("Admin role not found");
                }
                cachedAdminRoleId = role.id; // Cache the role ID
            }
            const newCompany = yield this.prisma.company.create({
                data: {
                    name,
                    website,
                    profile: {
                        create: {
                            cnpj,
                            primaryColor,
                            secondaryColor,
                            avatarUrl,
                            address,
                            socialMediaLinks,
                            bio,
                        },
                    },
                },
            });
            // Assign user to the company with Admin role
            yield this.prisma.companyUser.create({
                data: {
                    userId,
                    companyId: newCompany.id,
                    roleId: cachedAdminRoleId, // Use cached role ID
                },
            });
            return newCompany;
        });
    }
    inviteUserToCompany(inviteUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, companyId, roleId } = inviteUserDto;
            // Validate companyId
            const company = yield this.prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!company) {
                throw new common_2.BadRequestException("Invalid companyId");
            }
            // Validate roleId
            const role = yield this.prisma.role.findUnique({
                where: { id: roleId },
            });
            if (!role) {
                throw new common_2.BadRequestException("Invalid roleId");
            }
            // Check if the user already exists
            const user = yield this.prisma.user.findUnique({ where: { email } });
            if (user) {
                // User exists, create CompanyUser with userId
                yield this.prisma.companyUser.create({
                    data: {
                        userId: user.id,
                        email: user.email,
                        companyId,
                        roleId,
                        status: "active",
                    },
                });
            }
            else {
                // User does not exist, create entry with email and invited status
                yield this.prisma.companyUser.create({
                    data: {
                        email,
                        companyId,
                        roleId,
                        status: "invited",
                    },
                });
            }
            return { message: `Invitation sent to ${email}` };
        });
    }
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.company.findMany({ include: { profile: true } });
        });
    }
    getCompanyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.prisma.company.findUnique({
                where: { id },
                include: { profile: true },
            });
            if (!company) {
                throw new common_1.NotFoundException("Company not found");
            }
            return company;
        });
    }
    updateCompany(id, updateCompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, website, cnpj, primaryColor, secondaryColor, avatarUrl, address, socialMediaLinks, bio, } = updateCompanyDto;
            const updatedCompany = yield this.prisma.company.update({
                where: { id },
                data: {
                    name,
                    website,
                    profile: {
                        update: {
                            cnpj,
                            primaryColor,
                            secondaryColor,
                            avatarUrl,
                            address,
                            socialMediaLinks,
                            bio,
                        },
                    },
                },
            });
            return updatedCompany;
        });
    }
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.company.delete({ where: { id } });
        });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map