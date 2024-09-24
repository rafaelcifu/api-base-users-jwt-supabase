import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  // Create a new user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password, providerId, name, phone } = createUserDto;

    if (!providerId) {
      throw new BadRequestException("Provider ID is required");
    }

    return this.userService.createUser(
      email,
      password,
      providerId,
      name,
      phone
    );
  }

  // Get all users
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Get user by ID
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  // Get user by email
  @Get("email/:email")
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Param("email") email: string) {
    return this.userService.findUserByEmail(email);
  }

  // Update user
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // Delete user
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  // change password
  @Patch(":id/password")
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    console.log("Received ID:", id);
    return this.userService.changePassword(id, changePasswordDto);
  }

  // Update user profile
  @Patch(":id/profile")
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Param("id") id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userService.updateUserProfile(id, updateUserProfileDto);
  }
}
