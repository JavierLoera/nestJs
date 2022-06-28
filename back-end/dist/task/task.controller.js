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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task,service");
const create_task_dto_1 = require("./dto/create.task.dto");
const update_task_dto_1 = require("./dto/update.task.dto");
const passport_1 = require("@nestjs/passport");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getTasks() {
        return this.taskService.getTasks();
    }
    getTaskByid(idTask) {
        return this.taskService.getTaskId(idTask);
    }
    changeTaskState(idTask) {
        return this.taskService.changeStateCompleted(idTask);
    }
    AddTask(body) {
        return this.taskService.addTask(body);
    }
    deleteTask(idTask) {
        return this.taskService.deleteTask(idTask);
    }
    UpdateTask(idTask, body) {
        return this.taskService.UpdateTask(idTask, body);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)(':idTask'),
    __param(0, (0, common_1.Param)('idTask', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTaskByid", null);
__decorate([
    (0, common_1.Post)('changestate:idTask'),
    __param(0, (0, common_1.Param)('idTask', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "changeTaskState", null);
__decorate([
    (0, common_1.Post)('addtask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "AddTask", null);
__decorate([
    (0, common_1.Delete)(':idTask'),
    __param(0, (0, common_1.Param)('idTask', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Patch)(':idTask'),
    __param(0, (0, common_1.Param)('idTask', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "UpdateTask", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map