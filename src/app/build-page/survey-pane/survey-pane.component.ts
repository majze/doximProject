import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-survey-pane',
  templateUrl: './survey-pane.component.html',
  styleUrls: ['./survey-pane.component.css']
})
export class SurveyPaneComponent implements OnInit {
    messageForm: FormGroup;
    

  constructor() { }



  // getData(username, password) {
  //   // this.firebaseService.getUsers(username, password)
  //   // .subscribe(result => this.nextPage(result[0].payload.doc.id));
    
  //   var docReference = this.firebaseService.getUsers(username, password).subscribe() ;
  //   if (typeof docReference == "undefined") {
  //       console.log("undefined");
  //   }
  //   else {
  //       console.log("defined");
  //   }
  //   //.subscribe(result => this.nextPage(result[0].payload.doc.id));

  //   // this.firebaseService.getUsers(username, password)
  //   // .subscribe(result => {
  //   // this.items = result;
  //   // })
//}





  ngOnInit() {
  }

}
