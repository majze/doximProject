import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-survey-pane',
  templateUrl: './survey-pane.component.html',
  styleUrls: ['./survey-pane.component.css']
})
export class SurveyPaneComponent implements OnInit {
  activeCore: string;
  activeStatementType: string;
  
  // This part needs to work to send variables to parent!
  @Output() onSendFlags = new EventEmitter<string>();
  sendFlags() {
    //this.onSendFlags.emit(this.activeCore+"|"+this.activeStatementType)
    this.onSendFlags.emit(this.activeStatementType)
  }

  constructor() {
    this.activeCore="none";
   }

  setCore() {

  }

  setStatementType() {
    console.log("value selected: ", (<HTMLInputElement>event.target).value);
    this.activeStatementType = (<HTMLInputElement>event.target).value; 
  }

  // temp function for debugging
  readValue() {
    console.log("component value: ", this.activeStatementType);
  }

  // getCoreNames(coreName){
  //   this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})
  // }

  ngOnInit() {
  }

}
