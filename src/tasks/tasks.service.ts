import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository : TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task>{
    const found = await this.taskRepository.findOne(id);
    if (!found){
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    return found;
  }

  async createTask(createTaskDTO:CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTaskDTO(createTaskDTO);
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.taskRepository.delete(id);

    if(found.affected === 0){
      throw new NotFoundException(`Task with ID "${id}" not found`) 
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }
}
