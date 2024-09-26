import { PrismaService } from "../prisma/prisma.service";
import { CreateAuthProviderDto } from "./create-auth-provider.dto";
import { UpdateAuthProviderDto } from "./update-auth-provider.dto";
export declare class AuthProviderService {
    private prisma;
    constructor(prisma: PrismaService);
    createAuthProvider(data: CreateAuthProviderDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAuthProviders(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAuthProviderById(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateAuthProvider(id: string, data: UpdateAuthProviderDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAuthProvider(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
