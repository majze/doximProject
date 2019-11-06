import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
    messageForm: FormGroup;
    submitted = false;
    success = false;
    fail = false;
    items: Array<any>;
    docid: string;

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
        this.getData(vusername, vpassword);
    }

    nextPage() {
        if (this.success && this.submitted) {
            this.router.navigate(['./build']);
        }
    }
    
	getData(username, password) {
        var docReference;

        this.firebaseService.getUsers(username, password)
        .subscribe(result => { 
            this.items = result; 
            try {
                console.log("try");
                console.log(this.items[0].payload.doc.id);
                this.fail = false;
                this.submitted = true;
                this.success = true;
                this.nextPage();
            }
            catch(err) {
                console.log(err);
                this.fail = true;
                this.submitted = true;
                this.success = false;
            }
        });
    }

    refreshSubmit() {
        this.fail = false;
        this.success = false;
        this.submitted = false;
    }

    ngOnInit() {
    }
}