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
    this.service
      .executeHelloWorldBeanService()
      .subscribe((res) => this.handleSuccessFullResponse(res));
  }

  handleSuccessFullResponse(response: any) {
    this.welcomeMessage = response.message;
  }
}
