import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly excelService: StudentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file) {
    console.log(file);
    return await this.excelService.processExcel(file.path);
  }

  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ) {
    return await this.excelService.getAll(search, page, limit);
  }
  @Patch('update-status-tramite')
  async findOneAndUpdate(
    @Body('id') id: string,
    @Body('estado_solicitud') estado_solicitud: string,
  ) {
    return await this.excelService.updateStatusTramiteByStudentId(
      id,
      estado_solicitud,
    );
  }
  @Get('get-status-tramite/:identificacion')
  async getStatusTramite(@Param('identificacion') identificacion: string) {
    return await this.excelService.getStatusTramiteByStudentIdentificacion(
      identificacion,
    );
  }
}
