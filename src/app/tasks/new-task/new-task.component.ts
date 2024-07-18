import { Component, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private tasksService = inject(TasksService);
  private router = inject(Router);

  public userId = input.required<string>();

  onCancel() {
    this.router.navigate(['/users', this.userId(), 'tasks']);
  }

  onCreateTask(formData: NgForm) {
    this.tasksService.addTask({
      id: '',
      title: formData.form.value.title,
      dueDate: formData.form.value.dueDate,
      summary: formData.form.value.summary,
      userId: this.userId(),
      status: 'OPEN',
    });
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}
