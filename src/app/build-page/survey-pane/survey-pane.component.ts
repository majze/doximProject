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

  showSurvey()
   {
    
    if ((this.activeCore != '0') && (this.activeStatementType ==('creditCard' || 'account'))) 
    {

       for(var i =0; i<10; i++)
      {
        let hiddenCard:HTMLElement = document.getElementsByClassName("card")[i] as HTMLElement;
        hiddenCard.classList.remove("hideThisDiv");
      } 
    }
  }

  showHideCCQ() {
    this.activeStatementType = (<HTMLInputElement>event.target).value;
    let creditLogoQ: HTMLElement = document.getElementById("cclogoSelection") as HTMLElement;

    if (this.activeStatementType == "creditCard") {
      creditLogoQ.removeAttribute('style');
    }

    else if (this.activeStatementType != "creditCard") {
      creditLogoQ.style.display = "none";
    }

  }




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
