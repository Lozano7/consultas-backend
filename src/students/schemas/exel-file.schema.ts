import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StudentsData {
  @Prop()
  periodo: string;

  @Prop()
  carrera: string;

  @Prop()
  nivel: string;

  @Prop()
  identificacion: string;

  @Prop()
  apellidos: string;

  @Prop()
  nombres: string;

  @Prop()
  sexo: string;

  @Prop()
  etnia: string;

  @Prop()
  numero_hijos: string;

  @Prop()
  fecha_nacimiento: string;

  @Prop()
  edad: string;

  @Prop()
  foto_ingresada: string;

  @Prop()
  fecha_foto: string;

  @Prop()
  correo_institucional: string;

  @Prop()
  correo_personal?: string;

  @Prop()
  correo_siug: string;

  @Prop()
  convencional?: string;

  @Prop()
  celular?: string;

  @Prop()
  direccion: string;

  @Prop()
  referencia_domicilio: string;

  @Prop()
  comprobante: string;

  @Prop()
  usuario_registro: string;

  @Prop()
  estado: string;

  @Prop()
  concepto: string;

  @Prop()
  vez: string;

  @Prop()
  fecha_inicio_primer_nivel?: string;

  @Prop()
  nivelacion: string;

  @Prop()
  homologacion?: string;

  @Prop()
  procedencia?: string;

  @Prop()
  fecha_inicio_convalidacion?: string;

  @Prop()
  nombre_conyuge?: string;

  @Prop()
  discapacidad?: string;

  @Prop()
  porcentaje_discapacidad?: string;

  @Prop()
  tercera_matricula?: string;

  @Prop()
  reingreso?: string;

  @Prop()
  estado_solicitud?: string;
}

export const StudentsSchema = SchemaFactory.createForClass(StudentsData);
