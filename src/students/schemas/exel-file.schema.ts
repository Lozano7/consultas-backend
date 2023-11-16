import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StudentsData {
  @Prop()
  PERIODO: string;
  @Prop()
  CARRERA: string;
  @Prop()
  NIVEL: string;
  @Prop()
  IDENTIFICACION: string;
  @Prop()
  APELLIDOS: string;
  @Prop()
  NOMBRES: string;
  @Prop()
  SEXO: string;
  @Prop()
  ETNIA: string;
  @Prop()
  'NUMERO HIJOS': string;
  @Prop()
  'FECHA NACIMIENTO': string;
  @Prop()
  EDAD: string;
  @Prop()
  'FOTO INGRESADA': string;
  @Prop()
  'FECHA FOTO': string;
  @Prop()
  CORREO_INSTITUCIONAL: string;
  @Prop()
  CORREO_PERSONAL?: string;
  @Prop()
  CORREO_SIUG: string;
  @Prop()
  CONVENCIONAL?: string;
  @Prop()
  CELULAR?: string;
  @Prop()
  DIRECCION: string;
  @Prop()
  REFERENCIA_DOMICILIO: string;
  @Prop()
  COMPROBANTE: string;
  @Prop()
  USUARIO_REGISTRO: string;
  @Prop()
  ESTADO: string;
  @Prop()
  CONCEPTO: string;
  @Prop()
  VEZ: string;
  @Prop()
  FECHA_INICIO_PRIMER_NIVEL?: string;
  @Prop()
  NIVELACION: string;
  @Prop()
  HOMOLOGACION?: string;
  @Prop()
  PROCEDENCIA?: string;
  @Prop()
  FECHA_INICIO_CONVALIDACION?: string;
  @Prop()
  'NOMBRE CONYUGE'?: string;
  @Prop()
  DISCAPACIDAD?: string;
  @Prop()
  'PORCENTAJE DISCAPACIDAD'?: string;
  @Prop()
  TERCERA_MATRICULA?: string;
  @Prop()
  REINGRESO?: string;
}

export const StudentsSchema = SchemaFactory.createForClass(StudentsData);
