import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';
import { Task, TaskStatusOptions } from './task.model';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit, OnChanges {
  private tasksService = inject(TasksService);
  public selectedFilter = signal<string>('all');
  taskStatusOptions = TaskStatusOptions;
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  addTask = output<string>();
  isNewTaskPopup: boolean = false;
  tasks = computed<Task[]>(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService
          .getUserTasks(this.userId())
          .filter((task) => task.status === 'OPEN')
          .sort((a, b) => {
            if (this.order() === 'asc') {
              return a.id > b.id ? -1 : 1;
            } else {
              return a.id > b.id ? 1 : -1;
            }
          });
      case 'in-progress':
        return this.tasksService
          .getUserTasks(this.userId())
          .filter((task) => task.status === 'IN_PROGRESS')
          .sort((a, b) => {
            if (this.order() === 'asc') {
              return a.id > b.id ? -1 : 1;
            } else {
              return a.id > b.id ? 1 : -1;
            }
          });
      case 'done':
        return this.tasksService
          .getUserTasks(this.userId())
          .filter((task) => task.status === 'DONE')
          .sort((a, b) => {
            if (this.order() === 'asc') {
              return a.id > b.id ? -1 : 1;
            } else {
              return a.id > b.id ? 1 : -1;
            }
          });
      default:
        return this.tasksService.getUserTasks(this.userId()).sort((a, b) => {
          if (this.order() === 'asc') {
            return a.id > b.id ? -1 : 1;
          } else {
            return a.id > b.id ? 1 : -1;
          }
        });
    }
  });

  ngOnInit(): void {
    // this.selectedFilter.set('all');
    this.tasksService.taskChanged.subscribe((tasks) => {
      this.tasks = computed(() => {
        // return tasks.filter(task => task.userId === this.userId())
        switch (this.selectedFilter()) {
          case 'open':
            return tasks
              .filter((task) => task.userId === this.userId())
              .filter((task) => task.status === 'OPEN')
              .sort((a, b) => {
                if (this.order() === 'asc') {
                  return a.id > b.id ? -1 : 1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
              });
          case 'in-progress':
            return tasks
              .filter((task) => task.userId === this.userId())
              .filter((task) => task.status === 'IN_PROGRESS')
              .sort((a, b) => {
                if (this.order() === 'asc') {
                  return a.id > b.id ? -1 : 1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
              });
          case 'done':
            return tasks
              .filter((task) => task.userId === this.userId())
              .filter((task) => task.status === 'DONE')
              .sort((a, b) => {
                if (this.order() === 'asc') {
                  return a.id > b.id ? -1 : 1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
              });
          default:
            return tasks
              .filter((task) => task.userId === this.userId())
              .sort((a, b) => {
                if (this.order() === 'asc') {
                  return a.id > b.id ? -1 : 1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
              });
        }
      });
    });
  }

  ngOnChanges(): void {
    this.selectedFilter.set('all');
  }

  onAddTask() {
    this.isNewTaskPopup = true;
  }

  onCancelPopup() {
    this.isNewTaskPopup = false;
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
