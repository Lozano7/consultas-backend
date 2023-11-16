import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://lozanoj914:NSmF73ITQjDUjvyU@cluster0.bbdfh7l.mongodb.net/pasantiasdb?retryWrites=true&w=majority`,
    ),
    AuthModule,
    StudentsModule,
  ],
})
export class AppModule {}
