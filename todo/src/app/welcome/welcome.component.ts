import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  message = 'Some Welcome Message';
  welcomeMessage: string | undefined;
  name = '';
  constructor(
    private router: ActivatedRoute,
    private service: WelcomeDataService
  ) {}
  ngOnInit(): void {
    this.name = this.router.snapshot.params['name'];
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      (res) => this.handleSuccessFullResponse(res),
      (error) => this.handleErrorResponse(error)
    );
  }
  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service
      .executeHelloWorldBeanServiceWithPathVariable(this.name)
      .subscribe(
        (res) => this.handleSuccessFullResponse(res),
        (error) => this.handleErrorResponse(error)
      );
  }

  handleSuccessFullResponse(response: any) {
    this.welcomeMessage = response.message;
  }
  handleErrorResponse(err: any) {
    console.log(err);
    console.log(err.error.message);
    this.welcomeMessage = err;
  }
}
