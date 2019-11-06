import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

function getCoreType() {
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
  activeCore: string = null;
  activeStatementType: string;
  activeColorMode: string;
  activeCClogo: string;
  activeMaskType: string;
  activeScanline: string;
  activeMarketingLevel: string;
  activeOnsert: string;
  activeTransactionsMode: string;
  activeWhitespaceMode: string;
  activeJointOwners: string;
  activeTYDMode: string;
  activeRewardsType: string;
  activeOutboundEnvelope: string;
  activeReplyEnvelope: string;

  // Output emitter to build page component html page
  @Output() outputSurveyFlags = new EventEmitter<string>();
  @Output() outputSurveyChange = new EventEmitter<string>();

  // The whole survey except core and statement type are hidden
  // Until a core and statement type are selected
  showSurvey()
  {
    if ((this.activeCore != null) && ((this.activeStatementType == 'creditCard') || (this.activeStatementType == 'account'))) {
      for (var i = 0; i < 15; i++) {
        let hiddenCard: HTMLElement = document.getElementsByClassName("card")[i] as HTMLElement;
        hiddenCard.classList.remove("hideThisDiv");
      }
    }
  }

  // Function to hide and show the credit card question 
  // Based off the selection of cc from the statement type question
  showHideCCQ()
  {
    let creditLogoQ: HTMLElement = document.getElementById("cclogoSelection") as HTMLElement;
    if (this.activeStatementType == "creditCard") {
      creditLogoQ.removeAttribute('style');
    }
    else if (this.activeStatementType != "creditCard") {
      creditLogoQ.style.display = "none";
    }
  }

  // Function to hide and show statement only questions
  showHideSQ()
  { 
    
    for(var i = 0; i<15; i++)
    {
      let statementQ: HTMLElement = document.getElementsByClassName("statementQs")[i] as HTMLElement;
      if(this.activeStatementType == "statement")
      {
        statementQ.classList.remove("statementQs");
      }
      else if(this.activeStatementType != "statement")
      {
        statementQ.classList.add("statementQs");
      }
    
    }
  }

  showHideColorPicker()
  { 
    let colorPicker: HTMLElement = document.getElementsByClassName("headerColorPicker")[0] as HTMLElement;
    if (this.activeColorMode == "color")
    {
      colorPicker.classList.remove("hideThisDiv");
    }
    else
    {
      colorPicker.classList.add("hideThisDiv");
    }
  }

  // Sets the statement data core from user input on relevant question card
  setCore(event: any)
  {
    this.activeCore = event.target.value;
    console.log("survey: select: ", this.activeCore);
    this.outputSurveyChange.emit("activeCore");
    this.emitSurveyFlags();
  }

  // Sets the statement type from user input on relevant question card
  setStatementType()
  {
    this.activeStatementType = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeStatementType);
    this.outputSurveyChange.emit("activeStatementType");
    this.emitSurveyFlags();
  }

  // Sets the color mode from user input on relevant question card
  setColorMode()
  {
    this.activeColorMode = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeColorMode);
    this.outputSurveyChange.emit("activeColorMode");
    this.emitSurveyFlags();
    this.showHideColorPicker();

  }

  // Sets the credti card logo from user input on relevant question card
  setCClogo()
  {
    this.activeCClogo = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeCClogo);
    this.outputSurveyChange.emit("activeCClogo");
    this.emitSurveyFlags();
  }

  // Sets the statement masking type from user input on relevant question card
  setMaskType()
  {
    this.activeMaskType = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeMaskType);
    this.outputSurveyChange.emit("activeMaskType");
    this.emitSurveyFlags();
  }

  // Enables or hides the statement scanline from user input on relevant question card
  setScanline()
  {
    this.activeScanline = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeScanline);
    this.outputSurveyChange.emit("activeScanline");
    this.emitSurveyFlags();
  }

  // Sets the marketing level from user input on relevant question card
  setMarketingLevel()
  {
    this.activeMarketingLevel = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeMarketingLevel);
    this.outputSurveyChange.emit("activeMarketingLevel");
    this.emitSurveyFlags();
  }

  setOnsert()
  {

  }

  // Sets the mode for the Transaction Summary box from user input on relevant question card
  setTransaction()
  {
    this.activeTransactionsMode = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeTransactionsMode);
    this.outputSurveyChange.emit("activeTransactionsMode");
    this.emitSurveyFlags();
  }

  // Sets the whitespace advertisement option from user input on relevant question card
  setWhitespace()
  {
    this.activeWhitespaceMode = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeWhitespaceMode);
    this.outputSurveyChange.emit("activeWhitespaceMode");
    this.emitSurveyFlags();
  }

  setJointOwner()
  {

  }

  // Sets the option for YTD Totals from user input on relevant question card
  setYTD()
  {
    this.activeTYDMode = (<HTMLInputElement>event.target).value;
    console.log("survey: select: ", this.activeTYDMode);
    this.outputSurveyChange.emit("activeTYDMode");
    this.emitSurveyFlags();
  }

  setRewards()
  {

  }

  setOutbound()
  {

  }

  setEnvelope()
  {

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
    this.combinedFlags += this.activeOnsert + "|";
    this.combinedFlags += this.activeTransactionsMode + "|";
    this.combinedFlags += this.activeWhitespaceMode + "|";
    this.combinedFlags += this.activeJointOwners + "|";
    this.combinedFlags += this.activeTYDMode + "|";
    this.combinedFlags += this.activeRewardsType + "|";
    this.combinedFlags += this.activeOutboundEnvelope + "|";
    this.combinedFlags += this.activeReplyEnvelope + "|";
    this.outputSurveyFlags.emit(this.combinedFlags);
  }

  ngOnInit() {

  }

}
