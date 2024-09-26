import { UploadService } from "./avatar-upload.service";
export declare class AvatarController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadAvatar(file: Express.Multer.File, companyId: string): Promise<{
        message: string;
        fileName: string;
        publicUrl: string;
    }>;
}
