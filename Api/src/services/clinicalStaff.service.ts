import { ClinicalStaff } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class ClinicalStaffService {
  constructor(private prisma: PrismaService) {}

  async createClinicalStaff(data: ClinicalStaff) {
    return this.prisma.clinicalStaff.create({
      data,
    })
  }

  async getClinicalStaffById(id: number): Promise<ClinicalStaff> {
    return this.prisma.clinicalStaff.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllClinicalStaff(): Promise<ClinicalStaff[]> {
    return this.prisma.clinicalStaff.findMany()
  }

  async updateClinicalStaff(id: number, data: ClinicalStaff) {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado.', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.clinicalStaff.update({
        where: {
          id,
        },
        data,
      })
      return 'Usuario del personal médico actualizdo correctamente.'
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error al actualizar al usuario del personal médico.')
    }
  }

  async deleteClinicalStaff(id: number) {
    const clinicalStaff = await this.getClinicalStaffById(id)
    if (!clinicalStaff)
      throw new HttpException('Usuario del personal médico no encontrado', HttpStatus.NOT_FOUND)

    try {
      await this.prisma.clinicalStaff.delete({
        where: {
          id,
        },
      })

      return 'Usuario borrado del personal médico.'
    } catch (error) {
      throw new BadRequestException('Error al borrar la consulta.')
    }
  }
}
