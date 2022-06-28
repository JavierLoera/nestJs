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
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };

    let userD = await this.userService.findOneByEmail(user.email);
    const { id, email } = userD;
    const token = await this.generateToken(user);
    return { user: { id, email }, token };
  }

  public async create(user: any) {
    try {
      const userDb = await this.userService.findOneByEmail(user.email);
      if (userDb) throw Error;
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
      return error;
    }
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
