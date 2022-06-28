import {User} from '../entity/user.entity'
export const authProvider=[{
    provide:'AUTH_PROVIDER',
    useValue:User
}]