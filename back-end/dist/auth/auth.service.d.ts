import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private comparePassword;
    private hashPassword;
    private generateToken;
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<any>;
    getDataUser(token: string): Promise<{
        email: any;
        sub: any;
        newIat: Date;
        newExp: Date;
    }>;
    create(user: any): Promise<any>;
}
