import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  useForm!: FormGroup;
  id: number = 0;
  todo: Todo = new Todo(this.id, '', false, new Date());
  showUpdate: boolean = false;

  constructor(
    private todoServices: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initForm();

    if (this.id != -1) {
      this.todoServices.retrieveTodo('tranv', this.id).subscribe({
        next: (res) => {
          // console.log(res);
          this.todo = res;
          this.useForm.patchValue({
            description: res.description,
            targetDate: res.targetDate,
            done: res.done ? 'true' : 'false',
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.showUpdate = true;
    }
  }

  initForm() {
    this.useForm = this.fb.group({
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      targetDate: ['', Validators.required],
      done: [false],
    });
  }

  saveTodo() {
    if (this.useForm.invalid) {
      return;
    }

    const todoData = {
      ...this.todo,
      ...this.useForm.value,
    };

    if (this.id == -1) {
      todoData.id = undefined;
      this.todoServices.saveTodo('tranv', todoData).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['todos']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.todoServices
        .updateTodo('tranv', this.id, todoData)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['todos']);
        });
    }
  }
}
