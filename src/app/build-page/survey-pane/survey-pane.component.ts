import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
//import { FirebaseService } from '../services/firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';


=======
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
>>>>>>> 4515274688e848bf1dfdb9dd73b5b3a079f99283

@Component({
  selector: 'app-survey-pane',
  templateUrl: './survey-pane.component.html',
  styleUrls: ['./survey-pane.component.css']
})
export class SurveyPaneComponent implements OnInit {
    messageForm: FormGroup;
    items: Array<any>;


  constructor() { }

<<<<<<< HEAD


  // getCoreNames(coreName){
   
  //   this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})

  // }



=======
  // getCoreNames(coreName){
  //   this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})
  // }

>>>>>>> 4515274688e848bf1dfdb9dd73b5b3a079f99283
  ngOnInit() {
  }

}
