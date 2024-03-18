import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  await app.listen(process.env.PORT).then(() => {
    console.log('¡Hola mundo!')
  })
}
bootstrap()
