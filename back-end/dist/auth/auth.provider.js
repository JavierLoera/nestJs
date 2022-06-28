"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const user_entity_1 = require("../entity/user.entity");
exports.authProvider = [{
        provide: 'AUTH_PROVIDER',
        useValue: user_entity_1.User
    }];
//# sourceMappingURL=auth.provider.js.map