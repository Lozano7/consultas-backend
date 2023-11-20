// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('Usuario encontrado:', user);
    console.log('Contraseña ingresada:', password.trim());

    if (user) {
      const isMatch = await bcrypt.compare(
        password.trim(),
        user.password.trim(),
      );
      console.log('Coincide la contraseña:', isMatch);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user.toJSON();
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ email, password }: { email: string; password: string }) {
    // Verifica si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }

    // Valida la contraseña
    if (!this.validatePassword(password)) {
      throw new UnauthorizedException('La contraseña no cumple los requisitos');
    }

    // Hashea la contraseña antes de almacenarla
    console.log('Esta es la contraseña antes de hashear:', password);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Contraseña hasheada durante el registro:', hashedPassword);

    // Crea y guarda el nuevo usuario en la base de datos utilizando el servicio de usuario
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    return {
      email: newUser.email,
      access_token: this.jwtService.sign({ email, sub: newUser._id }),
    }; // Devuelve solo las propiedades deseadas
  }

  // Función de validación de contraseña
  private validatePassword(password: string): boolean {
    // Implementa lógica de validación según tus criterios
    // Aquí se requieren al menos 8 caracteres, 1 letra mayúscula, 1 número y 1 carácter especial
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private validateEmail(email: string): boolean {
    // Implementa lógica de validación según tus criterios
    // Aquí se requiere un correo electrónico válido
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
}
