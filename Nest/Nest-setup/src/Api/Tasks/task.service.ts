import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const id = this.tasks.length + 1;
    const task: Task = {
      id,
      title,
      description,
      status: 'OPEN',
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTaskStatus(id: number, status: 'OPEN' | 'DONE'): Task {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}