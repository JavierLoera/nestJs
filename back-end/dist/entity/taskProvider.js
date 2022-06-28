"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskProvider = void 0;
const task_entity_1 = require("./task.entity");
exports.taskProvider = [
    {
        provide: 'TASK_REPOSITORY',
        useValue: task_entity_1.Task,
    },
];
//# sourceMappingURL=taskProvider.js.map