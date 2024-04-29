import { AuthModule } from './modules/auth.module'
import { UsersModule } from './modules/users.module'
import { PatientModule } from './modules/patient.module'
import { MyMiddleware } from './middlewares/auth.middleware'
import { UsersController } from './controllers/users.controller'
import { PatientController } from './controllers/patient.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [UsersModule, AuthModule, PatientModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes(PatientController, UsersController)
  }
}
