import { AuthModule } from './modules/auth.module'
import { UsersModule } from './modules/users.module'
import { MyMiddleware } from './middlewares/auth.middleware'
import { PatientModule } from './modules/patient.module'
import { ConsultModule } from './modules/consult.module'
import { UsersController } from './controllers/users.controller'
import { PatientController } from './controllers/patient.controller'
import { ClinicalStaffModule } from './modules/clinicalStaff.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [UsersModule, AuthModule, PatientModule, ConsultModule, ClinicalStaffModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes(PatientController, UsersController)
  }
}
