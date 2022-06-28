import { User } from '../entity/user.entity';
export declare const authProvider: {
    provide: string;
    useValue: typeof User;
}[];
