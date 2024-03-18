import { User } from '@prisma/client'
import { UsersService } from 'src/services/users.service'
import { Get, Put, Body, Param, Delete, Controller, ParseIntPipe } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/get/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id))
  }

  @Get('/get-all')
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id))
  }

  @Put('/update/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: User) {
    return this.usersService.updateUser(id, data)
  }
}
