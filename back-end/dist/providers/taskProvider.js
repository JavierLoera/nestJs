"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskProvider = void 0;
const Task_1 = require("../models/Task");
exports.taskProvider = [{
        provide: 'TASK_REPOSITORY',
        useValue: Task_1.Task
    }];
//# sourceMappingURL=taskProvider.js.map