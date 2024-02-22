import { Request, Response } from 'express';
import { FakeDatabase } from '../models/Database';

const db = new FakeDatabase();

export async function createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const newTask = db.createTask(title, description);
    res.json(newTask);
}

export async function getAllTasks(req: Request, res: Response) {
    let { page, limit, sortBy, sortOrder } = req.query;
    page = typeof page === 'string' ? parseInt(page, 10).toString() : '1';
    limit = typeof limit === 'string' ? parseInt(limit, 10).toString() : '10';
    sortBy = sortBy || 'createdAt'; // Campo padrão para ordenação

    let sortOrderNumber: number;
    if (typeof sortOrder === 'string') {
        sortOrderNumber = sortOrder === 'desc' ? -1 : 1;
    } else {
        sortOrderNumber = 1; // Valor padrão se sortOrder não for uma string
    }

    const startIndex = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const endIndex = parseInt(page, 10) * parseInt(limit, 10);
  }
export async function getTaskById(req: Request, res: Response) {
    const taskId = parseInt(req.params.id, 10);
    const task = db.getTaskById(taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

export async function updateTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.id, 10);
    const { title, description } = req.body;
    const updatedTask = db.updateTask(taskId, title, description);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

export async function deleteTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.id, 10);
    const success = db.deleteTask(taskId);
    if (success) {
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}
