import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { StudentsData, StudentsSchema } from './schemas/exel-file.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentsData.name, schema: StudentsSchema },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
