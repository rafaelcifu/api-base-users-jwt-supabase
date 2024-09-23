export declare class CreateUserDto {
    email: string;
    password: string;
    providerId: string;
    name?: string;
    phone?: string;
    constructor(email: string, password: string, providerId: string);
}
