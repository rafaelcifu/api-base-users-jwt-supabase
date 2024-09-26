import { SupabaseService } from "../supabase/supabase.service";
export declare class UploadService {
    private readonly supabaseService;
    private prisma;
    constructor(supabaseService: SupabaseService);
    uploadAvatar(file: Express.Multer.File, companyId: string): Promise<{
        message: string;
        fileName: string;
        publicUrl: string;
    }>;
}
