import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
    findAll(req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }[]>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
}
