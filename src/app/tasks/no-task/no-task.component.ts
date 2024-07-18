import { Component } from '@angular/core';

import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-no-task',
  standalone: true,
  templateUrl: './no-task.component.html',
  styleUrl: './no-task.component.css',
  imports: [UsersComponent]
})
export class NoTaskComponent {}
