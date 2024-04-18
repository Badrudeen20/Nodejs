// src/tasks/tasks.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Post('task')
  createTask(@Body() createTaskDto: { title: string; description: string }): Task {
    return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
  }

  @Get('task')
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('task:id')
  getTaskById(@Param('id') id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Put('task:id/status')
  updateTaskStatus(@Param('id') id: number, @Body('status') status: 'OPEN' | 'DONE'): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('task:id')
  deleteTask(@Param('id') id: number): void {
    this.tasksService.deleteTask(id);
  }
}