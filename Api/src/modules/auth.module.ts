import { Module } from '@nestjs/common'
import { AuthService } from 'src/services/auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from 'src/controllers/auth.controller'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule],
})
export class AuthModule {}
