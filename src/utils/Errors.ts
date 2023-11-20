import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIdentificationException extends HttpException {
  constructor() {
    super('Identificación inválida', HttpStatus.BAD_REQUEST);
  }
}
