import { CreateUserDto } from './dto/create.user.dto';
import { User } from 'src/entity/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: typeof User);
    create(user: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
