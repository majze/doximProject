import { Component, OnInit } from '@angular/core';
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
    messageForm: FormGroup;
    items: Array<any>;


  constructor() { }

  /* getCoreNames(coreName){
    this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})
  } */

 ngOnInit() {
  }

}
