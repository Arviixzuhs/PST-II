import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth.module'
import { UsersModule } from './modules/users.module'
import { PatientModule } from './modules/patient.module'

@Module({
  imports: [UsersModule, AuthModule, PatientModule],
})
export class AppModule {}
