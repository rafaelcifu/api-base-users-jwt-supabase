import { PrismaService } from "../prisma/prisma.service";
import { CreateCompanyDto } from "./create-company.dto";
import { UpdateCompanyDto } from "./update-company.dto";
import { InviteUserDto } from "./invite-user.dto";
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    createCompany(createCompanyDto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        website: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    inviteUserToCompany(inviteUserDto: InviteUserDto): Promise<{
        message: string;
    }>;
    getAllCompanies(): Promise<({
        profile: {
            id: string;
            companyId: string;
            cnpj: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            avatarUrl: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        website: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getCompanyById(id: string): Promise<{
        profile: {
            id: string;
            companyId: string;
            cnpj: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            avatarUrl: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        website: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCompany(id: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        id: string;
        name: string;
        website: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCompany(id: string): Promise<{
        id: string;
        name: string;
        website: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
