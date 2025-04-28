import { PrismaService } from '../../prisma/prisma.service';
interface CreateUserInput {
    email: string;
    password: string;
}
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserInput): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    } | null>;
}
export {};
