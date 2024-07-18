import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task, TaskStatusOptions } from '../task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, CardComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  private tasksService = inject(TasksService);

  public task = input.required<Task>();
  public taskStatusOptions = TaskStatusOptions;

  onChangeTaskStatus(status: string) {
    // this.tasksService.removeTask(this.task().id);
    const newStatus = this.taskStatusOptions.find(
      (task) => task.value == status
    );
    this.tasksService.changeStatus(this.task().id, newStatus!.taskStatus);
  }

  onDeleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.removeTask(this.task().id);
    }
  }
}
