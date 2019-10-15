import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
    messageForm: FormGroup;
    submitted = false;
    success = false;
    items: Array<any>;
    
    // DON
    // Yo the live update code example
    loginForm = new FormControl('');

    /*  constructor(private router: Router, private formBuilder: FormBuilder) { */

    constructor(private formBuilder: FormBuilder, public firebaseService: FirebaseService, private router: Router) {
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
        var vusername = this.messageForm.controls.username.value;
        var vpassword = this.messageForm.controls.password.value;

        this.getCredentials(vusername, vpassword);

        if (this.success) {
            this.router.navigate(['./build']);
        }
    }

    public getCredentials(vusername, vpassword) {
        var username = "admin";
        var password = "password";

        if (username == vusername) {
            if (password == vpassword) {
                this.success = true;
            }
        }
        if (this.success) {
            return;
        }
        else {
            this.success = false;
        }
    }

    public refreshSubmit() {
        this.submitted = false;
    }

    ngOnInit() {
		this.getData();
    }
	
	getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
     // this.age_filtered_items = result;
     // this.name_filtered_items = result;
    })
  }

}
