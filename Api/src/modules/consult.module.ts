import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ConsultService } from 'src/services/consult.service'
import { ConsultController } from 'src/controllers/consult.controller'

@Module({
  controllers: [ConsultController],
  providers: [ConsultService],
  imports: [PrismaModule],
})
export class ConsultModule {}
