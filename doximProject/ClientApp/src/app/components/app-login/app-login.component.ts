import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
    messageForm: FormGroup;
    submitted = false;
    success = false;

    constructor(private router: Router, private formBuilder: FormBuilder) { 
        this.messageForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onSubmit() {
        this.submitted = true;

        if (this.messageForm.invalid) {
            return;
        }

        this.success = true;
    }
/*
    public onLoginClick() {
        this.submitted = true;
        console.log("here1");

        if (this.messageForm.invalid) {
            console.log("here2");
            this.success = false;
            return;
        }

        console.log("here3");
        this.submitted = false;
        this.router.navigate(['./survey']);
        this.success = true;
    }
*/
    public credentials() {
        function getUsername() {
            var username = "admin";
            return username;
        }

        function getPassword() {
            var password = "password";
            return password;
        }
    }




  ngOnInit() {
  }

}
