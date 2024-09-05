import { Component } from '@angular/core';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent {
  todos = [
    new Todo(1, 'Learn to Dance', false, new Date()),
    new Todo(1, 'Become an Expert at Angular', false, new Date()),
    new Todo(1, 'Visit Viet Nam', true, new Date()),
  ];
}
