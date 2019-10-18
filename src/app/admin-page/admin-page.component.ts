import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styles: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  items: Array<any>;
  

  
  
    /*
	getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })

  constructor(public firebaseService: FirebaseService) {
    this.messageForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  ngOnInit() {
		this.getData();
  }
  */
 ngOnInit() {
   
 }

}
