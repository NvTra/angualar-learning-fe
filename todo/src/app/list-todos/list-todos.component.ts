import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-todos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
})
export class ListTodosComponent {
  todos = [
    {
      id: 1,
      description: 'Learn to Dance',
    },
    {
      id: 2,
      description: 'Become an Expert at Angular',
    },
    {
      id: 3,
      description: 'Visit Viet Nam',
    },
  ];

  // todo = {
  //   id: 1,
  //   description: 'Learn to Dance',
  // };
}
