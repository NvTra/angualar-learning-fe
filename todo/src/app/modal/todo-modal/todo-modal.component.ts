import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { TodoDataService } from 'src/app/service/data/todo-data.service';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css'],
})
export class TodoModalComponent implements OnInit {
  formInstance!: FormGroup;
  todo: Todo = new Todo(0, '', false, new Date());
  showUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todoId: number },
    public dialogRef: MatDialogRef<TodoModalComponent>,
    private todoService: TodoDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const todoId = this.data.todoId;
    this.initForm();
    if (todoId != 0) {
      this.todoService.retrieveTodo('tranv', todoId).subscribe({
        next: (res) => {
          this.todo = res;
          this.formInstance.patchValue({
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
    } else {
      this.showUpdate = false;
    }
  }

  initForm() {
    this.formInstance = this.fb.group({
      id: new FormControl(''),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
      targetDate: new FormControl('', Validators.required),
      done: new FormControl(false),
    });
  }

  saveTodo() {
    if (this.formInstance.invalid) {
      return;
    }

    const todoData = {
      ...this.todo,
      ...this.formInstance.value,
    };

    if (this.data.todoId === 0) {
      todoData.id = undefined;
      this.todoService.saveTodo('tranv', todoData).subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open('Successfully created !', '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      todoData.id = this.data.todoId;
      this.todoService
        .updateTodo('tranv', this.data.todoId, todoData)
        .subscribe((data) => {
          console.log(data);
          this.snackBar.open('Successfully updated !', '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        });
    }
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
