"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async generateToken(user) {
        const token = await this.jwtService.signAsync({
            email: user.email,
            sub: user.id,
        });
        return token;
    }
    async validateUser(email, pass) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        const _a = user['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async login(user) {
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
            }
            else {
                throw new Error('Contrasena o usuario incorrecto');
            }
        }
        catch (error) {
            return error.message;
        }
    }
    async getDataUser(token) {
        const data = this.jwtService.verify(token);
        const { iat, exp, email, sub } = data;
        const newIat = new Date(0);
        newIat.setUTCSeconds(iat);
        const newExp = new Date(exp);
        newExp.setUTCSeconds(iat);
        return { email, sub, newIat, newExp };
    }
    async create(user) {
        try {
            const userDb = await this.userService.findOneByEmail(user.email);
            if (userDb)
                throw new Error('Ye existe un usuario con esa cuenta');
            else {
                const pass = await this.hashPassword(user.password);
                const newUser = await this.userService.create(Object.assign(Object.assign({}, user), { password: pass }));
                const _a = newUser['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
                const token = await this.generateToken(result);
                return { user: result, token };
            }
        }
        catch (error) {
            return error.message;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map