import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, FormsModule],
  templateUrl: './app.component.html',
  // template: '<h1>{{title}}<h1>',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo';
  message = 'Wellcome to in28Minutes';
}
