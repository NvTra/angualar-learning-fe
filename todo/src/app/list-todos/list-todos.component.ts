import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
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
export class ListTodosComponent implements OnInit, AfterViewInit {
  todos: MatTableDataSource<Todo> = new MatTableDataSource<Todo>([]);
  message: string | undefined;
  tableColumn: string[] = [
    'Index',
    'description',
    'targetDate',
    'done',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.todos.paginator = this.paginator;
  }

  constructor(
    private service: TodoDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.service.retrieveAllTodos('tranv').subscribe((res: Todo[]) => {
      this.todos.data = res;
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

  openDialog(todoId: number) {
    console.log(todoId);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });
    console.log(this.dialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTodo(todoId);
      }
    });
  }
}
