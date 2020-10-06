import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /* @Get()
  getAllTasks(): Task[]{
    return this.tasksService.getAllTasks();
  } */

  @Get()
  getATasks(@Query() filterDTO: GetTasksFilterDTO): Task[]{
    if(Object.keys(filterDTO).length){
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }  
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask( 
    @Body() createTaskDTO: CreateTaskDTO
    ): Task {
    return this.tasksService.createTask(createTaskDTO);
  }
  
  @Delete('/:id')
  deleteTask(@Param('id' )id: string): void{
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task{
    return this.tasksService.updateTaskStatus(id,status);
  }
}