import { Task } from './task.model';
import { TaskService } from './task.service';
export declare class TaskController {
    private tasksService;
    constructor(tasksService: TaskService);
    createTask(createTaskDto: {
        title: string;
        description: string;
    }): Task;
    getAllTasks(): Task[];
    getTaskById(id: number): Task;
    updateTaskStatus(id: number, status: 'OPEN' | 'DONE'): Task;
    deleteTask(id: number): void;
}
