import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

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
export class ListTodosComponent implements OnInit {
  todos: Todo[] = [];
  message: string | undefined;

  constructor(private service: TodoDataService, private router: Router) {}
  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.service.retrieveAllTodos('tranv').subscribe((res) => {
      this.todos = res;
    });
  }

  deleteTodo(id: number) {
    this.service.delete('tranv', id).subscribe((res) => {
      console.log(res);
      this.message = `Delete of Todo ${id} Successfuly`;
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
    console.log(id);
    this.router.navigate(['todo', id]);
  }

  addTodo() {
    this.router.navigate(['todo', -1]);
  }
}
