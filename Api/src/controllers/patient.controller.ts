import { Patient } from '@prisma/client'
import { PatientService } from 'src/services/patient.service'
import { Get, Put, Post, Body, Param, Delete, Controller, ParseIntPipe } from '@nestjs/common'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  register(@Body() data: Patient) {
    return this.patientService.patientRegister(data)
  }

  @Get('/get/:id')
  getUserById(@Param('id') id: string) {
    return this.patientService.getPatientById(Number(id))
  }

  @Get('/get-all')
  getAllUsers() {
    return this.patientService.getAllPatients()
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.patientService.deletePatient(Number(id))
  }

  @Put('/update/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: Patient) {
    return this.patientService.updatePatient(id, data)
  }
}
