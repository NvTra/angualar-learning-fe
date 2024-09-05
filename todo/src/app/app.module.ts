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
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIf,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
