import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./create-company.dto";
import { UpdateCompanyDto } from "./update-company.dto";
import { InviteUserDto } from "./invite-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Controller("companies")
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Post("invite")
  async inviteUserToCompany(@Body() inviteUserDto: InviteUserDto) {
    return this.companyService.inviteUserToCompany(inviteUserDto);
  }

  @Get()
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }

  @Get(":id")
  async getCompanyById(@Param("id") id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Patch(":id")
  async updateCompany(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete(":id")
  async deleteCompany(@Param("id") id: string) {
    return this.companyService.deleteCompany(id);
  }
}
