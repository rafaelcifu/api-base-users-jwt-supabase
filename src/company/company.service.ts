import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCompanyDto } from "./create-company.dto";
import { UpdateCompanyDto } from "./update-company.dto";
import { InviteUserDto } from "./invite-user.dto";
import { BadRequestException } from "@nestjs/common";
@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const {
      name,
      website,
      cnpj,
      primaryColor,
      secondaryColor,
      avatarUrl,
      address,
      socialMediaLinks,
      bio,
      userId,
    } = createCompanyDto;

    let cachedAdminRoleId: string | null = null;
    // Fetch the Admin role dynamically with caching
    if (!cachedAdminRoleId) {
      const role = await this.prisma.role.findFirst({
        where: {
          name: {
            in: ["admin", "administrator", "admin user"],
            mode: "insensitive",
          },
        },
      });

      if (!role) {
        throw new BadRequestException("Admin role not found");
      }

      cachedAdminRoleId = role.id; // Cache the role ID
    }

    const newCompany = await this.prisma.company.create({
      data: {
        name,
        website,
        profile: {
          create: {
            cnpj,
            primaryColor,
            secondaryColor,
            avatarUrl,
            address,
            socialMediaLinks,
            bio,
          },
        },
      },
    });

    // Assign user to the company with Admin role
    await this.prisma.companyUser.create({
      data: {
        userId,
        companyId: newCompany.id,
        roleId: cachedAdminRoleId, // Use cached role ID
      },
    });

    return newCompany;
  }

  async inviteUserToCompany(inviteUserDto: InviteUserDto) {
    const { email, companyId, roleId } = inviteUserDto;

    // Validate companyId
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      throw new BadRequestException("Invalid companyId");
    }

    // Validate roleId
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new BadRequestException("Invalid roleId");
    }

    // Check if the user already exists
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      // User exists, create CompanyUser with userId
      await this.prisma.companyUser.create({
        data: {
          userId: user.id,
          email: user.email,
          companyId,
          roleId,
          status: "active",
        },
      });
    } else {
      // User does not exist, create entry with email and invited status
      await this.prisma.companyUser.create({
        data: {
          email,
          companyId,
          roleId,
          status: "invited",
        },
      });
    }

    return { message: `Invitation sent to ${email}` };
  }

  async getAllCompanies() {
    return this.prisma.company.findMany({ include: { profile: true } });
  }

  async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    const {
      name,
      website,
      cnpj,
      primaryColor,
      secondaryColor,
      avatarUrl,
      address,
      socialMediaLinks,
      bio,
    } = updateCompanyDto;

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: {
        name,
        website,
        profile: {
          update: {
            cnpj,
            primaryColor,
            secondaryColor,
            avatarUrl,
            address,
            socialMediaLinks,
            bio,
          },
        },
      },
    });
    return updatedCompany;
  }

  async deleteCompany(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
