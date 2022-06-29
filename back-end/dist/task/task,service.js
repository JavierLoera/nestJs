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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("../entity/task.entity");
const taskInterface_1 = require("../interfaces/taskInterface");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTasks(userid) {
        const tasks = await this.taskRepository.findAll({
            where: { userId: userid },
        });
        return tasks;
    }
    async getTaskId(idTask) {
        const task = await task_entity_1.Task.findOne({ where: { id: idTask } });
        return task;
    }
    async changeStateCompleted(idTask) {
        const task = await task_entity_1.Task.findOne({ where: { id: idTask } });
        task.state = taskInterface_1.state.completed;
        task.save();
    }
    async addTask(task) {
        task.state = taskInterface_1.state.active;
        return await this.taskRepository.create(task);
    }
    async deleteTask(id, userId) {
        return await this.taskRepository.destroy({ where: { id, userId: userId } });
    }
    async UpdateTask(id, task, userId) {
        task.state = taskInterface_1.state.active;
        return await this.taskRepository.update(task, { where: { id, userId } });
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TASK_REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task,service.js.map