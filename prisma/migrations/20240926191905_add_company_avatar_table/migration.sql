-- CreateTable
CREATE TABLE "CompanyAvatar" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAvatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyAvatar_companyId_idx" ON "CompanyAvatar"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyAvatar" ADD CONSTRAINT "CompanyAvatar_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
