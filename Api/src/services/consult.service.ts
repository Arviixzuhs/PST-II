import { Consult } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ConsultService {
  constructor(private prisma: PrismaService) {}

  async createConsult(data: Consult) {
    const consultDate = new Date(data.date)
    return this.prisma.consult.create({
      data: {
        ...data,
        date: consultDate.toISOString(),
      },
    })
  }

  async getConsultById(id: number): Promise<Consult> {
    return this.prisma.consult.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllConsults(): Promise<Consult[]> {
    return this.prisma.consult.findMany()
  }

  async updateConsult(id: number, data: Consult) {
    const consult = await this.getConsultById(id)
    if (!consult) throw new HttpException('Consulta médica no encontrada.', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.consult.update({
        where: {
          id,
        },
        data,
      })
      return 'Consulta actualizada correctamente.'
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error al actualizar la consulta.')
    }
  }

  async deleteConsult(id: number) {
    const consult = await this.getConsultById(id)
    if (!consult) throw new HttpException('Consulta médica no encontrada.', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.consult.delete({
        where: {
          id,
        },
      })

      return 'Consulta eliminada correctamente.'
    } catch (error) {
      throw new BadRequestException('Error al borrar la consulta médica.')
    }
  }
}
