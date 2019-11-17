import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';

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
  activeHexCode: string;
  activeCClogo: string;
  activeCustomerlogo: string;
  activeMaskType: string;
  activeScanline: string;
  activeMarketingLevel: string;
  activeOnsert: string;
  activeNewsflash: string;
  activeGlance: string;
  activeAccSum: string;
  activeTransactionsMode: string;
  activeWhitespaceMode: string;
  activeJointOwners: string;
  activeTYDMode: string;
  activeRewardsType: string;
  activeOutboundEnvelope: string;
  activeReplyEnvelope: string;
 
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  customerlogoSubmitted: boolean;

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required)
  })

  // Reacts to submit button on customer image upload form
  constructor(
    private storage: AngularFireStorage,
    public firebaseService: FirebaseService
  ) {}

  // Output emitter to build page component html page
  @Output() outputSurveyFlags = new EventEmitter<string>();
  @Output() outputSurveyChange = new EventEmitter<string>();

  // PRATICK: Populate cores dropdown, work in progress!
  // Get core types from Firebase
  getCoreType() {
    this.firebaseService.getCores();
  }

  // Submit button turns the user uploaded image into an imageUrl
  onSubmit(formValue) {

    // JOSH: Upload Service, work in progress!
    // this.customerlogoSubmitted = true;
    // console.log("In onSubmit() " + this.formTemplate.valid);
    // console.log("In onSubmit() " + this.formTemplate.status);
    // this.isSubmitted = true;
    // this.uploadService.saveCustomerLogoToFirebaseStorage(this.selectedImage, this.imgSrc);
    // console.log("made it past serice call");
    // this.activeCustomerlogo = this.uploadService.firebaseStorageURL;
    // console.log("URL in survey component2: " + this.activeCustomerlogo);

    this.isSubmitted = true;
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;

            // Update preview pane
            this.activeCustomerlogo = url;
            this.outputSurveyChange.emit("activeCustomerlogo");
            this.emitSurveyFlags();
          })
        })
      ).subscribe();
  }

  // Reacts to OnChange event for uploading a customer image
  // Shows a preview thumbnail of user uploaded image
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];

      this.activeCustomerlogo = this.selectedImage;
      this.outputSurveyChange.emit("activeCustomerlogo");
      this.emitSurveyFlags();
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  // The whole survey except core and statement type are hidden
  // Until a core and statement type are selected
  showSurvey()
  {
    if ((this.activeCore != null) && ((this.activeStatementType == 'creditCard') || (this.activeStatementType == 'account')))
    {
      var cardQNum = document.getElementsByClassName("initialhideThisDiv").length;
      if (cardQNum <= 0)
      {
        return;
      }
      for (var i = 0; i < cardQNum; i++)
      {
        var hiddenCard: HTMLElement = document.getElementsByClassName("initialhideThisDiv")[i] as HTMLElement;
        hiddenCard.classList.remove("initialhideThisDiv");
      }
    }
    this.showHideQuestions();
  }

  // Function to hide and show the credit card question 
  // Based off the selection of cc from the statement type question
  showHideQuestions()
  {

    var qNum = document.getElementsByClassName("card").length;
    var qnum1 = 19;
    if (this.activeStatementType == "creditCard"){
      for(var i = 0; i< qnum1; i++){
        var creditCardQ: HTMLElement = document.getElementsByClassName("creditCardQs")[i] as HTMLElement;
        var regularCardQ:HTMLElement = document.getElementsByClassName("regularCardQs")[i] as HTMLElement;
        creditCardQ.classList.remove("hideThisDiv");
        regularCardQ.classList.add("hideThisDiv");
      }
    }
    
    if(this.activeStatementType == "account"){
      for(var i = 0; i<qnum1; i++){
        var creditCardQ: HTMLElement = document.getElementsByClassName("creditCardQs")[i] as HTMLElement;
        var regularCardQ:HTMLElement = document.getElementsByClassName("regularCardQs")[i] as HTMLElement;
        creditCardQ.classList.add("hideThisDiv");
        regularCardQ.classList.remove("hidThisDiv")
      }
    }

  }
  // If "Greyscale" is chosen, hide any mention of color selection
  showHideColorPicker()
  { 
    var colorPicker: HTMLElement = document.getElementsByClassName("headerColorPicker")[0] as HTMLElement;
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
    console.log("Survey choice:: ", this.activeCore);
    this.outputSurveyChange.emit("activeCore");
    this.emitSurveyFlags();
  }

  // Sets the statement type from user input on relevant question card
  setStatementType()
  {
    this.activeStatementType = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeStatementType);
    this.outputSurveyChange.emit("activeStatementType");
    this.emitSurveyFlags();
  }

  // Sets the color mode from user input on relevant question card
  setColorMode()
  {
    this.activeColorMode = (<HTMLInputElement>event.target).value;
    this.showHideColorPicker();
    console.log("Survey choice:: ", this.activeColorMode);
    this.outputSurveyChange.emit("activeColorMode");
    this.emitSurveyFlags();
    this.showHideColorPicker();
  }

  // If 'Full Color' is chosen, allow user to enter HEX info
  setHexCode()
  {
    this.activeHexCode = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeHexCode);
    this.outputSurveyChange.emit("activeHexCode");
    this.emitSurveyFlags();
  }

  // Sets the credti card logo from user input on relevant question card
  setCClogo()
  {
    this.activeCClogo = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeCClogo);
    this.outputSurveyChange.emit("activeCClogo");
    this.emitSurveyFlags();
  }

  // Sets the statement masking type from user input on relevant question card
  setMaskType()
  {
    this.activeMaskType = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeMaskType);
    this.outputSurveyChange.emit("activeMaskType");
    this.emitSurveyFlags();
  }

  // Enables or hides the statement scanline from user input on relevant question card
  setScanline()
  {
    this.activeScanline = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeScanline);
    this.outputSurveyChange.emit("activeScanline");
    this.emitSurveyFlags();
  }

  // Sets the marketing level from user input on relevant question card
  setMarketingLevel()
  {
    this.activeMarketingLevel = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeMarketingLevel);
    this.outputSurveyChange.emit("activeMarketingLevel");
    this.emitSurveyFlags();
  }

  // Sets the onsert graphic type and location from user input on relevant question card
  setOnsert()
  {
    this.activeOnsert = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeOnsert);
    this.outputSurveyChange.emit("activeOnsert");
    this.emitSurveyFlags();
  }

  // Sets the Newsflash graphic type and location from user input on relevant question card
  setNewsflash()
  {
    this.activeNewsflash = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ",this.activeNewsflash);
    this.outputSurveyChange.emit("activeNewsflash");
    this.emitSurveyFlags;

  }

  // Sets the hidden status for the Balance at a glance component from user input on relevant question card
  setGlance()
  {

  }

  setAccountSummary()
  {

  }

  // Sets the mode for the Transaction Summary box from user input on relevant question card
  setTransaction()
  {
    this.activeTransactionsMode = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeTransactionsMode);
    this.outputSurveyChange.emit("activeTransactionsMode");
    this.emitSurveyFlags();
  }

  // Sets the whitespace advertisement option from user input on relevant question card
  setWhitespace()
  {
    this.activeWhitespaceMode = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeWhitespaceMode);
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
    console.log("Survey choice:: ", this.activeTYDMode);
    this.outputSurveyChange.emit("activeTYDMode");
    this.emitSurveyFlags();
  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setRewards()
  {

  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setOutbound()
  {

  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setEnvelope()
  {

  }

  // Any survey option change triggers the emitter
  // Calls (outputSurveyFlags) on build-page.html then readSurveyEmitted() on build-page.ts
  emitSurveyFlags()
  {
    this.combinedFlags = "";
    this.combinedFlags += this.activeCore + "|";
    this.combinedFlags += this.activeStatementType + "|";
    this.combinedFlags += this.activeColorMode + "|";
    this.combinedFlags += this.activeHexCode + "|";
    this.combinedFlags += this.activeCClogo + "|";
    this.combinedFlags += this.activeCustomerlogo + "|";
    this.combinedFlags += this.activeMaskType + "|";
    this.combinedFlags += this.activeScanline + "|";
    this.combinedFlags += this.activeMarketingLevel + "|";
    this.combinedFlags += this.activeOnsert + "|";
    this.combinedFlags += this.activeNewsflash + "|";
    this.combinedFlags += this.activeGlance + "|";
    this.combinedFlags += this.activeAccSum + "|";
    this.combinedFlags += this.activeTransactionsMode + "|";
    this.combinedFlags += this.activeWhitespaceMode + "|";
    this.combinedFlags += this.activeJointOwners + "|";
    this.combinedFlags += this.activeTYDMode + "|";
    this.combinedFlags += this.activeRewardsType + "|";
    this.combinedFlags += this.activeOutboundEnvelope + "|";
    this.combinedFlags += this.activeReplyEnvelope + "|";
    this.outputSurveyFlags.emit(this.combinedFlags);
  }

  ngOnInit() {}
}