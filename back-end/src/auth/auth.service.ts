import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });
    return token;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    try {
      let userD = await this.userService.findOneByEmail(user.email);
      if (!userD) {
        throw Error('No existe una cuenta con ese email');
      }
      const result = await this.validateUser(user.email, user.password);
      if (result != null) {
        const { email, id } = userD['dataValues'];
        const token = await this.generateToken(result);
        return {
          user: { email, id },
          access_token: token,
        };
      } else {
        throw new Error('Contrasena o usuario incorrecto');
      }
    } catch (error) {
      return error.message;
    }
  }

  public async getDataUser(token: string) {
    const data = this.jwtService.verify(token);
    const { iat, exp, email, sub } = data;
    const newIat = new Date(0);
    newIat.setUTCSeconds(iat);
    const newExp = new Date(exp);
    newExp.setUTCSeconds(iat);
    return { email, sub, newIat, newExp };
  }

  public async create(user: any) {
    try {
      const userDb = await this.userService.findOneByEmail(user.email);
      if (userDb) throw new Error('Ye existe un usuario con esa cuenta');
      else {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({
          ...user,
          password: pass,
        });

        const { password, ...result } = newUser['dataValues'];
        const token = await this.generateToken(result);
        return { user: result, token };
      }
    } catch (error) {
      return error.message;
    }
  }
}
