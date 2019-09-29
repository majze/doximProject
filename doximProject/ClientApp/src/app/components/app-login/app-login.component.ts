import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

    constructor(private router: Router) { }

    public onLoginClick() {
        this.router.navigate(['./home']);
    }

  ngOnInit() {
  }

}
