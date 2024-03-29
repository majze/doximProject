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
  styleUrls: ['./survey-pane.component.css', 
    "../../../assets/tympanus/CreativeButtons/css/component.css", 
    "../../../assets/tympanus/CreativeButtons/css/default.css"
  ]
})

export class SurveyPaneComponent implements OnInit {
  // Every flag in the survey panel controls the survey and preview panel
  combinedFlags: string;
  activeCore: string = null;
  activeStatementType: string;
  activeColorMode: string = "color";
  activeHexCode: string;
  activeCClogo: string = "visa";
  activeCustomerlogo: string;
  activeMaskType: string = "none";
  activeScanline: string = "yes";
  activeMarketingLevel: string = "image";
  activeOnsert: string = "yes";
  activeNewsflash: string = "no";
  activeGlance: string = "yes";
  activeAccSum: string = "total";
  activeTransactionsMode: string = "balanceRight";
  activeWhitespaceMode: string = "yes";
  activeJointOwners: string = "no";
  activeTYDMode: string = "current";
  activeRewardsType: string;
  activeOutboundEnvelope: string;
  activeReplyEnvelope: string;
 
  // Processors for handling the user image upload
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  customerlogoSubmitted: boolean;

  // For displaying a progress bar on image uploads
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  // Array of cores from database to populate cores question with
  cores: Array<any>;

  // Used for hovering magic, stores ID of div and passes onto parent
  activeHoverType: string = "";

  // Used for image validation
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

  // Set focus
  setFocusQCard(val)
  {
    console.log("In survey.setFocusQCard(val): " + val);
    var myElement = document.getElementById(val);
    myElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    // Flash outline around qCard
    myElement.classList.add("scrollViewFlash");
    setTimeout(function(){
      myElement.classList.remove("scrollViewFlash");
    }, 1000);
  }

  // Submit button turns the user uploaded image into an imageUrl
  onSubmit(formValue) 
  {
    this.isSubmitted = true;
    // Check for blank file
      var filePath = "CustomerLogo" + `/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;

            // Update preview pane
            this.activeCustomerlogo = url;
            this.outputSurveyChange.emit("activeCustomerlogo");
            this.emitSurveyFlags();
            this.animateUploadBtn();
          })
        })
      ).subscribe();
  }

  // Animates the upload user image button upon success
  animateUploadBtn()
  {
    let uploadBtn:HTMLElement = document.getElementById("uploadBtn") as HTMLElement;
    uploadBtn.classList.add("btn-ty-success");
    uploadBtn.classList.add("btn-ty-7h-activated");
    setTimeout(function(){
      uploadBtn.classList.remove("btn-ty-success");
      uploadBtn.classList.remove("btn-ty-7h-activated");
    }, 2500);
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

  // Gets the id of the div that user is currently hovering over
  getid(obj) {
    this.activeHoverType = obj.target.id;
    console.log(this.activeHoverType);
  }

  // The whole survey except core and statement type are hidden
  // Until a core and statement type are selected
  showSurvey()
  {
    console.log("Core: " + this.activeCore + " Type: " + this.activeStatementType);
    if (this.activeCore != null && (this.activeStatementType == 'creditCard' || this.activeStatementType == 'account'))
    {
      var hiddenCount = document.getElementsByClassName("initialhideThisDiv").length;
      if (hiddenCount > 0)
      {
        var hiddenCardDiv:HTMLElement = document.getElementsByClassName("initialhideThisDiv")[0] as HTMLElement;
        hiddenCardDiv.classList.remove("initialhideThisDiv");
      }
    }
    this.showHideCCQ();
    this.showHideSQ();
  }

  // Function to hide and show the credit card question 
  // Based off the selection of cc from the statement type question
  showHideCCQ()
  {
    var ccQNum = document.getElementsByClassName("creditcardQs").length;
    if (this.activeStatementType == "creditCard")
    {
      for(var i=0; i < ccQNum; i++)
      {
        let creditCardQ: HTMLElement = document.getElementsByClassName("creditcardQs")[i] as HTMLElement;
        creditCardQ.classList.remove("hideThisDiv");
      }
    }
    else if (this.activeStatementType != "creditCard")
    {
      for(var i=0; i < ccQNum; i++)
      {
        let creditCardQ: HTMLElement = document.getElementsByClassName("creditcardQs")[i] as HTMLElement;
        creditCardQ.classList.add("hideThisDiv");
      }
    }
  }
  
  // Function to hide and show statement only questions
  showHideSQ()
  {
    var statementQNum = document.getElementsByClassName("statementQs").length;
    if (this.activeStatementType == "account")
    {
      for(var i=0; i< statementQNum; i++)
      {
        let statementQ: HTMLElement = document.getElementsByClassName("statementQs")[i] as HTMLElement;
        statementQ.classList.remove("hideThisDiv");
      }
    }
    else if (this.activeStatementType != "account")
    {
      for(var i =0; i< statementQNum; i++)
      {
        let statementQ: HTMLElement = document.getElementsByClassName("statementQs")[i] as HTMLElement;
        statementQ.classList.add("hideThisDiv");
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
    
    // Update color header picker input value for each default skeleton statement
    const colorPicker: HTMLInputElement = document.getElementById('headerColorPicker') as HTMLInputElement;
    if (this.activeStatementType == "creditCard" && (colorPicker.value == "#559ecd" || colorPicker.value == "#0055a4"))
    {
      colorPicker.value = "#559ecd";
    }
    else if (this.activeStatementType == "account" && (colorPicker.value == "#559ecd" || colorPicker.value == "#0055a4"))
    {
      colorPicker.value = "#0055a4";
    }
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

  // Updates the other hex input field when the sibling hex input field is updated
  updateHexes(origin)
  {
    var headerColorPicker:HTMLInputElement = document.getElementById('headerColorPicker') as HTMLInputElement;
    var hexInput:HTMLInputElement = document.getElementById('hexInput') as HTMLInputElement;
    if (origin == "fromPicker")
    {
      hexInput.value = headerColorPicker.value;
    }
    else if (origin == "fromText")
    {
      headerColorPicker.value = hexInput.value;
    }

    // Show the warning for hue and header colors once a custom hex color is chosen
    var hexWarning = document.getElementsByClassName("hex-warning");
    if (hexWarning.length > 0)
      hexWarning[0].classList.remove("hex-warning");
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

    // If credit card statement and 'no' for onsert, include whitespace qCard, otherwise remove
    if (this.activeStatementType == "creditCard" && this.activeOnsert == "none")
    {
      var whitespaceQCard = document.getElementById("whitespaceTypeCard") as HTMLElement;
      whitespaceQCard.classList.remove("statementQs");
      whitespaceQCard.classList.remove("hideThisDiv");

    }
    else if (this.activeStatementType == "creditCard" && this.activeOnsert != "none")
    {
      var whitespaceQCard = document.getElementById("whitespaceTypeCard") as HTMLElement;
      whitespaceQCard.classList.add("statementQs");
      whitespaceQCard.classList.add("hideThisDiv");
    }
    else if (this.activeStatementType == "account")
    {
      var whitespaceQCard = document.getElementById("whitespaceTypeCard") as HTMLElement;
      whitespaceQCard.classList.add("statementQs");
      whitespaceQCard.classList.remove("hideThisDiv");
    }

    // Change the newsflash radio button to no if 'image' or 'text' onsert is selected for Account
    if (this.activeStatementType == "account" && this.activeOnsert != "none")
    {
      var checkCircle = document.getElementById("newsflash-no") as HTMLInputElement;
      checkCircle.checked = true;
      this.activeNewsflash = "no";
    }
  }

  // Sets the Newsflash graphic type and location from user input on relevant question card
  setNewsflash()
  {
    this.activeNewsflash = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeNewsflash);
    this.outputSurveyChange.emit("activeNewsflash");
    this.emitSurveyFlags();
  }

  // Sets the hidden status for the Balance at a glance component from user input on relevant question card
  setGlance()
  {
    this.activeGlance = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeGlance);
    this.outputSurveyChange.emit("activeGlance");
    this.emitSurveyFlags();
  }

  setAccountSummary()
  {
    this.activeAccSum = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeAccSum);
    this.outputSurveyChange.emit("activeAccSum");
    this.emitSurveyFlags();
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

  // Sets the option for YTD Totals from user input on relevant question card
  setYTD()
  {
    this.activeTYDMode = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeTYDMode);
    this.outputSurveyChange.emit("activeTYDMode");
    this.emitSurveyFlags();
  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setJointOwner()
  {
    // Awaiting client approval
    this.activeOnsert = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeOnsert);
    this.outputSurveyChange.emit("activeJointowner");
    this.emitSurveyFlags();
  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setRewards()
  {
    // Awaiting client approval
  }

  setOutbound()
  {
    this.activeOutboundEnvelope = (<HTMLInputElement>event.target).value;
    console.log("Survey choice:: ", this.activeOutboundEnvelope);
    this.outputSurveyChange.emit("activeOutboundEnvelope");
    this.emitSurveyFlags();

    // Determine which asset to load into pop-up window
    var imgString = "";
    if (this.activeOutboundEnvelope == "fullWindow") {
      imgString = '../../assets/shared/env_fullwindow.png';
    }
    else if (this.activeOutboundEnvelope == "doubleWindow")
    {
      imgString = '../../assets/shared/env_doublewindow.png';
    }
    else if (this.activeOutboundEnvelope == "singleWindow")
    {
      imgString = '../../assets/shared/env_singlewindow.png';
    }
    else if (this.activeOutboundEnvelope == "halfWindow")
    {
      imgString = '../../assets/shared/env_halfwindow.png';
    }

    // Get size info for pop-up window
    var w = 900, h = 600;
    if (document.getElementById) {
      w = screen.availWidth;
      h = screen.availHeight;
    }  
    var popW = 1400, popH = 500;
    var leftPos = (w-popW)/2;
    var topPos = (h-popH)/2;

    // Show envelope selected in pop-up window
    var msgWindow = window.open('','popup','width=' + popW + ',height=' + popH + ',top=' + topPos + ',left=' + leftPos + ',       scrollbars=yes');
    msgWindow.document.write ('<img src="'+imgString+'" >');
  }

  // === BACKLOG QUESTION ADDED WHEN ASSETS AND LOGIC ARE MADE ===
  setEnvelope()
  {
    // Awaiting client approval
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

  // Sends data to build page to send to survey page
  emitSurveyClick(clickedPreviewFlag)
  {
    this.outputSurveyFlags.emit(clickedPreviewFlag);
  }

  // Up Arrow - Sends user to top of preview panel on click
  toTop()
  {
    var topDivPos = document.getElementById("surveyList");
    topDivPos.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  ngOnInit() {
    this.firebaseService.getCores()
    .subscribe(result => {
      this.cores = result;
    })
  }
}
