"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskProvider = void 0;
const task_entity_1 = require("../entity/task.entity");
exports.taskProvider = [
    {
        provide: 'Task_REPOSITORY',
        useValue: task_entity_1.Task,
    },
];
//# sourceMappingURL=task.providers.js.map