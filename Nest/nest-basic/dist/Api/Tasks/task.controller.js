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
const task_model_1 = require("./task.model");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    createTask(createTaskDto) {
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
    }
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
    getTaskById(id) {
        return this.tasksService.getTaskById(id);
    }
    updateTaskStatus(id, status) {
        return this.tasksService.updateTaskStatus(id, status);
    }
    deleteTask(id) {
        this.tasksService.deleteTask(id);
    }
};
__decorate([
    (0, common_1.Post)('task'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", task_model_1.Task)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('task'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TaskController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)('task:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", task_model_1.Task)
], TaskController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Put)('task:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", task_model_1.Task)
], TaskController.prototype, "updateTaskStatus", null);
__decorate([
    (0, common_1.Delete)('task:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "deleteTask", null);
TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map