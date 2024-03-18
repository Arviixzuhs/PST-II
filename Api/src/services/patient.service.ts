import { Patient } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpStatus, Injectable, HttpException, BadRequestException } from '@nestjs/common'

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async patientRegister(data: Patient) {
    const { CI } = data

    const patient = await this.prisma.patient.findUnique({
      where: {
        CI,
      },
    })

    if (patient) throw new BadRequestException('Ese paciente ya está registrado')

    return this.prisma.patient.create({
      data,
    })
  }

  async getPatientById(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.prisma.patient.findMany()
  }

  async updatePatient(id: number, data: Patient) {
    const patient = await this.getPatientById(id)

    if (!patient) {
      throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.patient.update({
        where: {
          id,
        },
        data,
      })
      return 'Paciente actualizado correctamente'
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error al actualizar al paciente')
    }
  }

  async deletePatient(id: number) {
    const user = await this.getPatientById(id)

    if (!user) {
      throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.prisma.patient.delete({
        where: {
          id,
        },
      })

      return 'Paciente eliminado correctamente'
    } catch (error) {
      throw new BadRequestException('Error al borrar al paciente')
    }
  }
}
