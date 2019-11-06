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

  constructor(public firebaseService: FirebaseService) { }

  // Add user to Firestore
  addUser()
  {
    alert("Person not added!");
  }

  // Hue changing test 
  changeHue()
  {
    let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;
    var hexNumberFromUserInput = "poop";
    //function HERE hex to hueNumber
    var hueNumber = Math.floor(Math.random() * 360) + 1;
    var degrees = hueNumber + "deg";
    console.log(degrees);
    ccMidSectionBuffer.style.filter="hue-rotate("+degrees+")";
  }

  ngOnInit()
  {
    
  }
  
}