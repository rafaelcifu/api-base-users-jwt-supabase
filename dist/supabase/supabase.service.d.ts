import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupabaseService {
    private readonly supabase;
    constructor();
    getClient(): SupabaseClient;
}
