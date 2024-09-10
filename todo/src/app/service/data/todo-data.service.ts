import { Injectable } from '@angular/core';
import { HelloWorldBean } from './welcome-data.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_JPA_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllTodos(usename: string) {
    return this.http.get<Todo[]>(`${API_JPA_URL}/user/${usename}/todos`);
  }

  retrieveTodo(usename: string, id: number) {
    return this.http.get<Todo>(`${API_JPA_URL}/user/${usename}/todos/${id}`);
  }

  updateTodo(usename: string, id: number, todo: Todo) {
    return this.http.put<Todo>(`${API_JPA_URL}/user/${usename}/todos`, todo);
  }

  saveTodo(usename: string, todo: Todo) {
    return this.http.post(`${API_JPA_URL}/user/${usename}/todos`, todo);
  }

  delete(usename: string, id: number) {
    return this.http.delete(`${API_JPA_URL}/user/${usename}/todos/${id}`);
  }
}
