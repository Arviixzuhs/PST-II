import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ClinicalStaffService } from 'src/services/clinicalStaff.service'
import { ClinicalStaffController } from 'src/controllers/clinicalStaff.controller'

@Module({
  controllers: [ClinicalStaffController],
  providers: [ClinicalStaffService],
  imports: [PrismaModule],
})
export class ClinicalStaffModule {}
