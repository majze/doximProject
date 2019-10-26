import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

function getCoreType(){
  var x = document.getElementById("coreSelection") as HTMLSelectElement;
  var y = x.options[x.selectedIndex].value;
  return y;
}


@Component({
  selector: 'app-survey-pane',
  templateUrl: './survey-pane.component.html',
  styleUrls: ['./survey-pane.component.css']
})
export class SurveyPaneComponent implements OnInit {
    messageForm: FormGroup;
    items: Array<any>;
    isShow = false;
    showStatement = false;
    showCC = false;

    toggleDisplay(){
      this.isShow = !this.isShow;
    }

    toggleStatement(){
      if(getCoreType() != "0"){
      this.isShow = true;
      }
      else{
        this.toggleDisplay;
      }
    }

    toggleCredit(){
      this.toggleDisplay();

    }
    toggleSurvey(){
      this.toggleDisplay();

    }

  constructor() { }

  /* getCoreNames(coreName){
    this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})
  } */

 ngOnInit() {
  }

}
