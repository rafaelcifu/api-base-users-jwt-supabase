export declare class CreateCompanyDto {
    name: string;
    website?: string;
    cnpj?: string;
    primaryColor?: string;
    secondaryColor?: string;
    avatarUrl?: string;
    address?: string;
    socialMediaLinks?: object;
    bio?: string;
    userId: string;
    constructor(name: string, userId: string);
}
