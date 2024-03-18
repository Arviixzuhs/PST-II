import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async updateUser(id: number, data: User) {
    const user = await this.getUserById(id)

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data,
      })
      return 'Usuario actualizado correctamente'
    } catch (error) {
      throw new BadRequestException('Error al actualizar el usuario')
    }
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id)

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      })

      return 'Usuario eliminado correctamente'
    } catch (error) {
      throw new BadRequestException('Error al borrar al usuario')
    }
  }
}
