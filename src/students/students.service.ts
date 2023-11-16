import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StudentsData } from './schemas/exel-file.schema';

import * as xlsx from 'xlsx';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentsData.name)
    private readonly yourModel: Model<StudentsData>,
  ) {}

  async processExcel(
    filePath: string,
  ): Promise<{ message: string; data: any } | { message: string }> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const dataArray: any = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
    });

    const headers = dataArray[0]; // Tomar la primera fila como encabezados
    const formattedData = dataArray.slice(1).map((row) => {
      const formattedRow: any = {}; // Usa "any" para manejar valores nulos
      headers.forEach((header, index) => {
        // Asigna null si el valor en la fila es undefined o null, de lo contrario, usa el valor existente
        formattedRow[header] = row[index] !== undefined ? row[index] : null;
      });
      return formattedRow;
    });

    // Procesa los datos y guárdalos en la base de datos
    await this.yourModel.insertMany(formattedData);

    return {
      message: 'Datos procesados correctamente',
      data: formattedData,
    };
  }
}
