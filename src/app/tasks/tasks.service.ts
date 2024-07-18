import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { map, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  public  taskChanged = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  fetchTasks() {
    return this.http
      .get<Task[]>(
        'https://pesto-task-37b62-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
      )
      .pipe(
        tap((tasks) => {
          if (tasks == null) {
            this.tasks = [];
          } else {
            this.tasks = tasks;
          }
          this.taskChanged.next(this.tasks.slice());
        })
      );
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  changeStatus(id: string, newSatus: string) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status: newSatus } : task
    );
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  addTask(newTask: Task) {
    const currentUserTasksLength = this.tasks.filter(task => task.userId === newTask.userId).length + 1
    this.tasks.unshift({...newTask, id: currentUserTasksLength.toString()});
    this.saveTasks();
  }

  private saveTasks() {
    this.taskChanged.next(this.tasks.slice());
    this.http
      .put(
        'https://pesto-task-37b62-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
        this.tasks
      )
      .subscribe((response) => console.log(response));
  }
}
