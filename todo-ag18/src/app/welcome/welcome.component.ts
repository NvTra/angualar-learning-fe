import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  message = 'Some Welcome Message';
  name = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    console.log(this.name);
  }
}
