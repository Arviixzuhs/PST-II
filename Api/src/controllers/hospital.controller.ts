import { HospitalService } from 'src/services/hospital.service'
import { Get, Controller } from '@nestjs/common'

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get('/get-stats')
  getAllUsers() {
    return this.hospitalService.getInfo()
  }
}
