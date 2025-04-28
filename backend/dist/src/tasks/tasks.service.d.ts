import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }[]>;
    update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: string;
        userId: number;
    }>;
}
