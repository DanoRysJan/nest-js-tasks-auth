//metadata: ArgumentMetadata is optional in transform, the same with metadata

import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../enums/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: any): string{
    value = value.toUpperCase();
    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is a invalid status`)
    }
    return value;
  }

  private isStatusValid( status: any): boolean{
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}