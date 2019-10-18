import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  items: Array<any>;
  

  
  
    
	

  constructor(public firebaseService: FirebaseService) {
    
  }

  ngOnInit() {
		this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }
  
}