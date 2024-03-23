import { Task } from './task.model';
export declare class TaskService {
    private tasks;
    createTask(title: string, description: string): Task;
    getAllTasks(): Task[];
    getTaskById(id: number): Task;
    updateTaskStatus(id: number, status: 'OPEN' | 'DONE'): Task;
    deleteTask(id: number): void;
}
