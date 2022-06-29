import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
declare const jwtStrategy_base: new (...args: any[]) => Strategy;
export declare class jwtStrategy extends jwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: any): Promise<{
        sub: any;
        email: any;
    }>;
}
export {};
