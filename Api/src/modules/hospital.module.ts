import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { HospitalService } from 'src/services/hospital.service'
import { HospitalController } from 'src/controllers/hospital.controller'

@Module({
  controllers: [HospitalController],
  providers: [HospitalService],
  imports: [PrismaModule],
})
export class HospitalModule {}
