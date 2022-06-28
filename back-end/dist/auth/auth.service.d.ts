import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: {
            id: number;
            email: string;
        };
        token: string;
        access_token?: undefined;
    }>;
    create(user: any): Promise<any>;
    private comparePassword;
    private hashPassword;
    private generateToken;
}
