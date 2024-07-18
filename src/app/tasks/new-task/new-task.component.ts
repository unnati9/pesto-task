import { Component, inject, input, output } from '@angular/core';
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
  userId = input.required<string>();
  closeNewTaskPopup = output<void>();

  private tasksService = inject(TasksService);
  private router = inject(Router);

  onCancel() {
    this.router.navigate(['/users', this.userId(), 'tasks']);
  }

  onCreateTask(formData: NgForm) {
    this.tasksService.addTask({
      id: formData.form.value.title + this.userId(),
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
