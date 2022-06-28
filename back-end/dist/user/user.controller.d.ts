import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    GetUserByEmail(email: string): Promise<import("../entity/user.entity").User>;
    addUser(createUserDto: CreateUserDto): Promise<import("../entity/user.entity").User>;
}
