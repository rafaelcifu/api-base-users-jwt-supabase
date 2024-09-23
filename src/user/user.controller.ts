import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { ChangePasswordDto } from "./change-password.dto";
import { UpdateUserProfileDto } from "./update-user-profile.dto";

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
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Get user by ID
  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  // Get user by email
  @Get("email/:email")
  async getUserByEmail(@Param("email") email: string) {
    return this.userService.findUserByEmail(email);
  }

  // Update user
  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // Delete user
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  // change password
  @Patch(":id/password")
  async changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    console.log("Received ID:", id);
    return this.userService.changePassword(id, changePasswordDto);
  }

  // Update user profile
  @Patch(":id/profile")
  async updateUserProfile(
    @Param("id") id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userService.updateUserProfile(id, updateUserProfileDto);
  }
}
