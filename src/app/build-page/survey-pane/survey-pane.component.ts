import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
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
<<<<<<< HEAD
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
=======
  combinedFlags: string;
  activeCore: string;
  activeStatementType: string;
  activeColorMode: string;
  activeCClogo: string;
  activeMaskType: string;
  activeScanline: string;
  activeMarketingLevel: string;
  
  // output emitter to build page component html page
  @Output() outputSurveyFlags = new EventEmitter<string>();
>>>>>>> 3a0963871e3df701cfa41c0087e9210f4e8a5cb5

  // function set core from dropdown
  setCore(event: any)
  {
    this.activeCore = event.target.value;
    console.log("survey: select: ", this.activeCore);
    this.emitSurveyFlags();
  }

  // function call from survey HTML radio button
  setStatementType()
  {
    this.activeStatementType = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeStatementType);
    this.emitSurveyFlags();
  }

<<<<<<< HEAD
  /* getCoreNames(coreName){
    this.firebaseService.getCores(coreName).subscribe(result => {this.items = result;})
  } */

 ngOnInit() {
=======
  // function set color mode from radio button
  setColorMode()
  {
    this.activeColorMode = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeColorMode);
    this.emitSurveyFlags();
  }

  setCClogo()
  {
    this.activeCClogo = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeCClogo);
    this.emitSurveyFlags();
>>>>>>> 3a0963871e3df701cfa41c0087e9210f4e8a5cb5
  }

  setMaskType()
  {
    this.activeMaskType = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeMaskType);
    this.emitSurveyFlags();
  }

  setScanline()
  {
    this.activeScanline = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeScanline);
    this.emitSurveyFlags();
  }

  setMarketingLevel()
  {
    this.activeMarketingLevel = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeMarketingLevel);
    this.emitSurveyFlags();
  }

  // Any survey option change triggers the emitter
  // Calls (outputSurveyFlags) on build-page.html then readSurveyEmitted() on build-page.ts
  emitSurveyFlags()
  {
    console.log("survey: emitting flags to build");
    this.combinedFlags = "";
    this.combinedFlags += this.activeCore + "|";
    this.combinedFlags += this.activeStatementType + "|";
    this.combinedFlags += this.activeColorMode + "|";
    this.combinedFlags += this.activeCClogo + "|";
    this.combinedFlags += this.activeMaskType + "|";
    this.combinedFlags += this.activeScanline + "|";
    this.combinedFlags += this.activeMarketingLevel + "|";
    console.log("survey: combinedFlags: ", this.combinedFlags);
    this.outputSurveyFlags.emit(this.combinedFlags);
  }

  ngOnInit() { }

}
