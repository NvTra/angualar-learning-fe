import { Injectable } from '@angular/core';
import { HelloWorldBean } from './welcome-data.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllTodos(usename: string) {
    return this.http.get<Todo[]>(`http://localhost:8080/user/${usename}/todos`);
  }

  retrieveTodo(usename: string, id: number) {
    return this.http.get<Todo>(
      `http://localhost:8080/user/${usename}/todos/${id}`
    );
  }

  updateTodo(usename: string, id: number, todo: Todo) {
    return this.http.put<Todo>(
      `http://localhost:8080/user/${usename}/todos`,
      todo
    );
  }

  saveTodo(usename: string, todo: Todo) {
    return this.http.post(`http://localhost:8080/user/${usename}/todos`, todo);
  }

  delete(usename: string, id: number) {
    return this.http.delete(
      `http://localhost:8080/user/${usename}/todos/${id}`
    );
  }
}
