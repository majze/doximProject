import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { forEach } from '@angular/router/src/utils/collection';

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
        this.getData(vusername, vpassword);
    }

    nextPage(documentID) {
        if (documentID == "user1" || documentID == "user2") {
            console.log("true");
            this.fail = false;
            this.submitted = true;
            this.success = true;
        }
        else {
            console.log("false"); 
            this.fail = true;
            this.submitted = true;
            this.success = false;
        }

        if (this.success && this.submitted) {
            this.router.navigate(['./build']);
        }
    }
    
	getData(username, password) {
        // this.firebaseService.getUsers(username, password)
        // .subscribe(result => this.nextPage(result[0].payload.doc.id));
        
        var docReference = this.firebaseService.getUsers(username, password).subscribe();
        if (typeof docReference == "undefined") {
            console.log("undefined");
        }
        else {
            console.log("defined");
        }
        //.subscribe(result => this.nextPage(result[0].payload.doc.id));

        // this.firebaseService.getUsers(username, password)
        // .subscribe(result => {
        // this.items = result;
        // })
    }

    refreshSubmit() {
        this.fail = false;
        this.success = false;
        this.submitted = false;
    }

    ngOnInit() {
    }
}
