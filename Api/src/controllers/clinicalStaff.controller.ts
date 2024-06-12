import { ClinicalStaff } from '@prisma/client'
import { ClinicalStaffService } from 'src/services/clinicalStaff.service'
import { Get, Put, Post, Body, Param, Delete, Controller, ParseIntPipe } from '@nestjs/common'

@Controller('clinical-staff')
export class ClinicalStaffController {
  constructor(private readonly clinicalStaffService: ClinicalStaffService) {}

  @Post('/create')
  register(@Body() data: ClinicalStaff) {
    return this.clinicalStaffService.createClinicalStaff(data)
  }

  @Get('/get/:id')
  getById(@Param('id') id: string) {
    return this.clinicalStaffService.getClinicalStaffById(Number(id))
  }

  @Get('/get-all')
  getAll() {
    return this.clinicalStaffService.getAllClinicalStaff()
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.clinicalStaffService.deleteClinicalStaff(Number(id))
  }

  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: ClinicalStaff) {
    return this.clinicalStaffService.updateClinicalStaff(id, data)
  }
}
