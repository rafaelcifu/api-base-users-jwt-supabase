import { Injectable, BadRequestException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail"; // Importing as default

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private userService: UserService, private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_PUBLIC_KEY as string
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Setting API key correctly
  }

  async signUp(email: string, password: string, name: string) {
    // Step 1: Check if the user already exists in your own database
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
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

    // Validate that supabaseUser.id is defined
    if (!supabaseUser?.id) {
      throw new Error("Supabase user ID is undefined");
    }

    // Step 3: Create user in your own database with the name included
    let newUser;
    try {
      newUser = await this.prisma.user.create({
        data: {
          email,
          name,
          supabaseId: supabaseUser.id, // Guaranteed to be a string now
        },
      });

      // Step 4: Link the user with the provider (Email in this case)
      await this.createUserProvider(
        newUser.id,
        "8308ea76-9e2d-40e4-86cd-d61a48b02d21"
      ); // Use your provider ID

      // Step 5: Update the CompanyUser entry with the new userId and status 'active'
      await this.updateCompanyUserStatus(email, newUser.id);

      // Step 6: Send a welcome email using SendGrid with name from User
      await this.sendWelcomeEmail(email, newUser.name || "User", newUser.id);
    } catch (err) {
      console.error("Error during user sign-up or email sending:", err);
      // Log error to the database using Prisma
      try {
        await this.prisma.log.create({
          data: {
            type: "error",
            service: "UserService",
            message: "User sign-up or email sending failed",
            email: newUser?.email || email,
            metadata: {
              userId: newUser?.id || "unknown",
              error: (err as Error).message,
              stack: (err as Error).stack,
            },
          },
        });
      } catch (loggingError) {
        console.error("Failed to log the error:", loggingError);
      }
      throw new BadRequestException("User creation or email sending failed.");
    }

    return {
      message: `User created successfully. A welcome email has been sent to ${email}.`,
      user: newUser,
    };
  }

  // Method to link user with provider in the UserProvider table
  private async createUserProvider(userId: string, providerId: string) {
    await this.prisma.userProvider.create({
      data: {
        userId,
        providerId,
      },
    });
  }

  // Method to update CompanyUser status after user signup
  private async updateCompanyUserStatus(email: string, userId: string) {
    await this.prisma.companyUser.updateMany({
      where: {
        email: email,
        status: "invited",
      },
      data: {
        userId: userId,
        status: "active",
      },
    });
  }

  // Helper method to send a welcome email
  private async sendWelcomeEmail(email: string, name: string, userId: string) {
    const msg = {
      to: email,
      from: "contato@pmakers.com.br", // Your verified sender email
      templateId: "d-f4e143892c59480da4aa899e476defed", // Your SendGrid dynamic template ID
      dynamicTemplateData: {
        firstName: name,
      },
    };

    console.log("Sending email with data:", msg); // Log the message data

    try {
      await sgMail.send(msg);
      console.log("Welcome email sent successfully");
    } catch (sendGridError) {
      console.error("Error sending welcome email:", sendGridError);

      // Log the error to the database using Prisma
      try {
        await this.prisma.log.create({
          data: {
            type: "error",
            service: "SendGrid",
            message: "Failed to send welcome email",
            email,
            metadata: {
              userId,
              error: (sendGridError as Error).message,
              stack: (sendGridError as Error).stack,
            },
          },
        });
      } catch (loggingError) {
        console.error("Failed to log the email error:", loggingError);
      }
    }
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
