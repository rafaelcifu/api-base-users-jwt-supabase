import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupabaseService {
    private readonly supabase;
    constructor();
    getClient(): SupabaseClient;
    getCompanyAvatar(companyId: string): Promise<{
        fileName: any;
    } | null>;
    uploadAvatar(file: Express.Multer.File, companyId: string): Promise<{
        error: import("@supabase/storage-js").StorageError;
        fileName?: undefined;
        publicUrl?: undefined;
    } | {
        fileName: string;
        publicUrl: string;
        error?: undefined;
    }>;
    deleteAvatar(fileName: string): Promise<{
        message: string;
    }>;
}
