import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  private emailRequestCount = 0; // Track email requests
  private readonly EMAIL_LIMIT = 5; // Set your limit
  private readonly TIME_FRAME = 60000; // 1 minute in milliseconds
  private lastRequestTime: number = Date.now();
  private supabase: SupabaseClient;

  constructor(
    private userService: UserService,
    private prisma: PrismaService // Add PrismaService for database operations
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_PUBLIC_KEY as string
    );
  }

  async signUp(email: string, password: string) {
    // Reset rate limit counter logic...

    // Step 1: Check if the user already exists in your own database
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException("User already exists in the database.");
    }

    // Step 2: Create the user in Supabase
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error)
      throw new BadRequestException("Supabase error: " + error.message);
    const supabaseUser = data.user;

    // Step 3: Create user in your own database
    const newUser = await this.userService.createUser(
      email,
      password,
      "8308ea76-9e2d-40e4-86cd-d61a48b02d21", // providerId for email
      undefined, // name, if available
      undefined, // phone, if available
      supabaseUser?.id // Pass supabaseId directly to user service
    );

    return { message: `User created successfully`, user: newUser };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  }

  async getUser(jwt: string) {
    const { data, error } = await this.supabase.auth.getUser(jwt);
    if (error) throw new Error(error.message);
    return data.user;
  }
}
