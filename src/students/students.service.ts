import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StudentsData } from './schemas/exel-file.schema';

import { InvalidIdentificationException } from 'src/utils/Errors';
import * as xlsx from 'xlsx';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentsData.name)
    private readonly studentsModel: Model<StudentsData>,
  ) {}

  async processExcel(
    filePath: string,
  ): Promise<{ message: string; data: any } | { message: string }> {
    await this.studentsModel.deleteMany({});
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const dataArray: any = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
    });

    const headers = dataArray[0].map((header: string) =>
      header.toLowerCase().replace(/ /g, '_'),
    );
    //Tomar la primera fila como encabezados
    const formattedData = dataArray.slice(1).map((row) => {
      const formattedRow: any = {}; // Usa "any" para manejar valores nulos
      headers.forEach((header, index) => {
        // Asigna null si el valor en la fila es undefined o null, de lo contrario, usa el valor existente
        formattedRow[header] = row[index] !== undefined ? row[index] : null;
      });
      // Agrega el nuevo campo "estado_solicitud"
      formattedRow.estado_solicitud = 'Sin solicitud'; // Puedes establecer el valor que desees
      return formattedRow;
    });

    // Procesa los datos y guárdalos en la base de datos
    await this.studentsModel.insertMany(
      formattedData.map((data) => new this.studentsModel(data)),
    );

    return {
      message: 'Datos procesados correctamente',
      data: formattedData,
    };
  }

  async getAll(
    search: string = '',
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: StudentsData[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const query = search
      ? {
          identificacion: { $regex: search, $options: 'i' },
        }
      : {};
    const skip = (Number(page) - 1) * limit;
    const data = await this.studentsModel
      .find({
        ...query,
      })
      .limit(limit)
      .skip(skip);
    const total = await this.studentsModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, page, limit };
  }

  async updateStatusTramiteByStudentId(
    studentId: string,
    status: string,
  ): Promise<StudentsData> {
    return await this.studentsModel.findOneAndUpdate(
      { _id: studentId },
      { estado_solicitud: status },
    );
  }

  async getStatusTramiteByStudentIdentificacion(identificacion: string) {
    if (!this.validateIdentificacion(identificacion)) {
      // quizás quieras lanzar una excepción aquí 404
      throw new InvalidIdentificationException();
    }
    const student = await this.studentsModel
      .findOne({ identificacion })
      .select('estado_solicitud');

    if (!student) {
      // quizás quieras lanzar una excepción aquí 404
      throw new NotFoundException('Estudiante no encontrado');
    }

    return student.estado_solicitud;
  }

  private validateIdentificacion(identificacion: string): boolean {
    // Implementa lógica de validación según tus criterios
    // Aquí se requiere una identificacion valida
    const emailRegex = /^[0-9]{10,10}$/;
    return emailRegex.test(identificacion);
  }
}
