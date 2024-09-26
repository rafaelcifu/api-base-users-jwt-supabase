import { PrismaService } from "../prisma/prisma.service";
import { CreateCompanyDto } from "./create-company.dto";
import { UpdateCompanyDto } from "./update-company.dto";
import { InviteUserDto } from "./invite-user.dto";
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    createCompany(createCompanyDto: CreateCompanyDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        website: string | null;
    }>;
    inviteUserToCompany(inviteUserDto: InviteUserDto): Promise<{
        message: string;
    }>;
    private sendInvitationEmail;
    private generateRandomString;
    getAllCompanies(): Promise<({
        profile: {
            id: string;
            bio: string | null;
            avatarUrl: string | null;
            companyId: string;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        website: string | null;
    })[]>;
    getCompanyById(id: string): Promise<{
        profile: {
            id: string;
            bio: string | null;
            avatarUrl: string | null;
            companyId: string;
            createdAt: Date;
            updatedAt: Date;
            cnpj: string | null;
            primaryColor: string | null;
            secondaryColor: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        website: string | null;
    }>;
    updateCompany(id: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        website: string | null;
    }>;
    deleteCompany(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        website: string | null;
    }>;
}
