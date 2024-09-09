import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { HttpIntercepterBasicService } from './service/http/http-intercepter-basic.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    FooterComponent,
    ListTodosComponent,
    ErrorComponent,
    MenuComponent,
    LogoutComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIf,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterBasicService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
