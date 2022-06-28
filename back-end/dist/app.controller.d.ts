import { AuthService } from './auth/auth.service';
export declare class AppController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
}
