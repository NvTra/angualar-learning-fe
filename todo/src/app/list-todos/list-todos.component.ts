import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IRequestPayLoad } from '../interfaces/request-payload';
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
  totalItems = 0;
  tableColumn: string[] = [
    'Index',
    'description',
    'targetDate',
    'done',
    'action',
  ];

  requestPayload: IRequestPayLoad = {
    username: 'tranv',
    pageIndex: 0,
    pageSize: 5,
    sorting: { direction: 1, field: 'id' },
  };

  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;

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
    this.service.getAllTodos(this.requestPayload).subscribe((res) => {
      this.todos.data = [...res.data];
      this.totalItems = res.totalCount;
    });
  }

  onPageChange(event: PageEvent) {
    this.requestPayload.pageIndex = event.pageIndex;
    this.requestPayload.pageSize = event.pageSize;

    this.refreshTodos();
  }

  deleteTodo(id: number) {
    this.service.delete('tranv', id).subscribe((res) => {
      console.log(res);
      this.message = `Delete of Todo ${id} Successfuly`;
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
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
