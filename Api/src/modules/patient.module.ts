import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PatientService } from 'src/services/patient.service'
import { PatientController } from 'src/controllers/patient.controller'

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [PrismaModule],
})
export class PatientModule {}
