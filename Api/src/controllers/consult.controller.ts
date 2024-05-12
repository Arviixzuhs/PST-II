import { Consult } from '@prisma/client'
import { ConsultService } from 'src/services/consult.service'
import { Get, Put, Post, Body, Param, Delete, Controller, ParseIntPipe } from '@nestjs/common'

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @Post('/create')
  register(@Body() data: Consult) {
    return this.consultService.createConsult(data)
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: string) {
    return this.consultService.getConsultById(Number(id))
  }

  @Get('/get-all')
  getAllConsults() {
    return this.consultService.getAllConsults()
  }

  @Delete('/delete/:id')
  deleteConsult(@Param('id') id: string) {
    return this.consultService.deleteConsult(Number(id))
  }

  @Put('/update/:id')
  updateConsult(@Param('id') id: string, @Body() data: Consult) {
    return this.consultService.updateConsult(Number(id), data)
  }
}
