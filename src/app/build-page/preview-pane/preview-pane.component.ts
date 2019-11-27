import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css', 
    "../../../assets/tympanus/CreativeButtons/css/component.css", 
    "../../../assets/tympanus/CreativeButtons/css/default.css"
  ]
})

export class PreviewPaneComponent implements OnInit {
  clickedPreviewFlag: string;
  activeCore: string;
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
  activeSymitarCC: boolean;
  activeSymitarReg: boolean;

  // Creates the viewContainerRef class to link itself to its parent (build-page)
  constructor(private viewContainerRef: ViewContainerRef) { }

  // Output emitter to build page component html page
  @Output() outputPreviewFlag = new EventEmitter<string>();
  @Output() outputPreviewClick = new EventEmitter<string>();

  // Animates the Drive-Thru sample button
  driveThru()
  {
    let pdfButton:HTMLElement = document.getElementsByClassName("btn btn-7 btn-7a icon-truck")[0] as HTMLElement;
    pdfButton.classList.add("btn-activated");
    setTimeout(function(){
      pdfButton.classList.remove("btn-activated");
    }, 1000);
  }

  // Animates the Generate Runbook button
  animateRunbookBtn()
  {
    let pdfButton:HTMLElement = document.getElementsByClassName("btn btn-7 btn-7b icon-envelope")[0] as HTMLElement;
    pdfButton.classList.add("btn-activated");
    setTimeout(function(){
      pdfButton.classList.remove("btn-activated");
    }, 1000);
  }

  // Generates a runbook file for the sales force and design engineers from client preference
  generateRunbook()
  {
    this.getSurveyDataFromBuild();
    var runbook = "";
    runbook += "Core" + ": " + this.activeCore;
    runbook += "\n" + "StatementType" + ": " + this.activeStatementType;
    runbook += "\n" + "ColorMode" + ": " + this.activeColorMode;
    runbook += "\n" + "HexCode" + ": " + this.activeHexCode;
    if (this.activeSymitarCC)
      runbook += "\n" + "CClogo" + ": " + this.activeCClogo;
    if (this.activeCustomerlogo != "undefined")
      runbook += "\n" + "Customerlogo" + ": " + "Yes";
    runbook += "\n" + "MaskType" + ": " + this.activeMaskType;
    runbook += "\n" + "Scanline" + ": " + this.activeScanline;
    runbook += "\n" + "MarketingLevel" + ": " + this.activeMarketingLevel;
    runbook += "\n" + "Onsert" + ": " + this.activeOnsert;
    if (this.activeSymitarReg)
    {
      runbook += "\n" + "Newsflash" + ": " + this.activeNewsflash;
      runbook += "\n" + "Glance" + ": " + this.activeGlance;
      runbook += "\n" + "AccSum" + ": " + this.activeAccSum;
    }
    runbook += "\n" + "TransactionsMode" + ": " + this.activeTransactionsMode;
    runbook += "\n" + "WhitespaceMode" + ": " + this.activeWhitespaceMode;
    //runbook += "\n" + "JointOwners" + ": " + this.activeJointOwners;
    runbook += "\n" + "TYDMode" + ": " + this.activeTYDMode;
    //runbook += "\n" + "RewardsType" + ": " + this.activeRewardsType;
    //runbook += "\n" + "OutboundEnvelope" + ": " + this.activeOutboundEnvelope;
    //runbook += "\n" + "ReplyEnvelope" + ": " + this.activeReplyEnvelope;
    console.log(runbook);

    (function () {
      var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
      };
    
      var create = document.getElementById('runBtn');
      var textbox = runbook;
    
      create.addEventListener('click', function () {
        var linkDiv = document.getElementById('downloadBtnDiv');
        linkDiv.classList.remove("collapse");
        var runDiv = document.getElementById('generateBtnDiv');
        runDiv.classList.add("collapse");
        var link = <HTMLAnchorElement> document.getElementById('downloadlink');
        link.href = makeTextFile(textbox);
      }, false);
      
      document.getElementById("generateBtnDiv").click();

    })();
    
  }

  // Any call to this function gets the build-page (parent) variables
  getParentComponent(): BuildPageComponent
  {
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
  }

  // === ** The following functions are getters for the build-page (parent) variables ** ================ //

  getCore()
  {
    this.activeCore = this.getParentComponent().activeCore;
  }

  getStatementType()
  {
    this.activeStatementType = this.getParentComponent().activeStatementType;
  }

  getColorMode()
  {
    this.activeColorMode = this.getParentComponent().activeColorMode;
  }

  getHexCode()
  {
    this.activeHexCode = this.getParentComponent().activeHexCode;
  }

  getCClogo()
  {
    this.activeCClogo = this.getParentComponent().activeCClogo;
  }

  getCustomerlogo()
  {
    this.activeCustomerlogo = this.getParentComponent().activeCustomerlogo;
  }

  getMaskType()
  {
    this.activeMaskType = this.getParentComponent().activeMaskType;
  }

  getScanline()
  {
    this.activeScanline = this.getParentComponent().activeScanline;
  }

  getMarketing()
  {
    this.activeMarketingLevel = this.getParentComponent().activeMarketingLevel;
  }

  getOnsert()
  {
    this.activeOnsert = this.getParentComponent().activeOnsert;
  }

  getNewsflash()
  {
    this.activeNewsflash = this.getParentComponent().activeNewsflash;
  }

  getGlance()
  {
    this.activeGlance = this.getParentComponent().activeGlance;
  }

  getAcctSum()
  {
    this.activeAccSum = this.getParentComponent().activeAccSum;
  }

  getTransactionMode()
  {
    this.activeTransactionsMode = this.getParentComponent().activeTransactionsMode;
  }

  getWhitespaceMode()
  {
    this.activeWhitespaceMode = this.getParentComponent().activeWhitespaceMode;
  }

  getJointOwners()
  {
    this.activeJointOwners = this.getParentComponent().activeJointOwners;
  }

  getTYDMode()
  {
    this.activeTYDMode = this.getParentComponent().activeTYDMode;
  }

  getRewardsType()
  {
    this.activeRewardsType = this.getParentComponent().activeRewardsType;
  }

  getOutboundEnvelope()
  {
    this.activeOutboundEnvelope = this.getParentComponent().activeOutboundEnvelope;
  }

  getReplyEnvelope()
  {
    this.activeReplyEnvelope = this.getParentComponent().activeReplyEnvelope;
  }

  // Fetches all survey flags from build-page parent, automatically called when populating the skeleton
  getSurveyDataFromBuild()
  {
    this.getCore();
    this.getStatementType();
    this.getColorMode();
    this.getHexCode();
    this.getCClogo();
    this.getCustomerlogo();
    this.getMaskType();
    this.getScanline();
    this.getMarketing();
    this.getOnsert();
    this.getNewsflash();
    this.getGlance();
    this.getAcctSum();
    this.getTransactionMode();
    this.getWhitespaceMode();
    this.getJointOwners();
    this.getTYDMode();
    this.getRewardsType();
    this.getOutboundEnvelope();
    this.getReplyEnvelope();
    // future gets
  }

  // Counts how many grid sections there are for each statement type and returns an integer
  gridSectionCounter()
  {
    if (this.activeStatementType == "creditCard" && this.activeCore == "symitar")
    {
      return 17;
    }
    else if (this.activeStatementType == "account" && this.activeCore == "symitar")
    {
      return 14;
    }
    else
    {
      console.log("Error in gridSectionCounter(): Unexpected activeStatementType and activeCore");
      return 1;
    }
  }

  // Applies or removes greyscale filter to all "gridSection" divs based on status of variable "activeColorMode"
  updateColorMode()
  {
    // Apply filter to preview pane
    var gridSectionCount = this.gridSectionCounter();
    if (this.activeColorMode == "greyscale")
    {
      for(var i =0; i < gridSectionCount; i++)
      {
        let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
        divChange.classList.add("black_and_white");
      }
    }
    else
    {
      for(var i =0; i < gridSectionCount; i++)
      {
        let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
        divChange.classList.remove("black_and_white");
      }
    }

    // Reload assets in color or greyscale
    if (this.activeSymitarCC)
    {
      this.populateSymitarCC();
    }
    else if (this.activeSymitarReg)
    {
      this.populateSymitarRegular();
    }
  }

  // Updates a specific grid section when the user updates an option in the survey pane
  makeChanges(lastChange)
  {
    // Select which function to update
    if (lastChange == "activeCore")
    {
      // Do nothing as populateSkeleton() already handles this
    }
    else if (lastChange == "activeStatementType")
    {
      this.showStatements();
    }
    else if (lastChange == "activeColorMode")
    {
      this.updateColorMode();
    }
    else if (lastChange == "activeHexCode")
    {
      this.changeHue();
    }
    else if (lastChange == "activeCClogo")
    {
      this.updateCClogo();
    }
    else if (lastChange == "activeCustomerlogo")
    {
      this.updateCustomerlogo();
    }
    else if (lastChange == "activeMaskType")
    {
      this.updateMasking();
    }
    else if (lastChange == "activeScanline")
    {
      this.updateScanline();
    }
    else if (lastChange == "activeMarketingLevel")
    {
      this.updateMarketing();
    }
    else if (lastChange == "activeOnsert")
    {
      this.updateOnsert();
    }
    else if (lastChange == "activeNewsflash")
    {
      this.updateNewsflash();
    }
    else if (lastChange == "activeGlance")
    {
      this.updateGlance();
    }
    else if (lastChange == "activeAccSum")
    {
      this.updateAccountSummary();
    }
    else if (lastChange == "activeTransactionsMode")
    {
      this.updateTransactionSummary();
    }
    else if (lastChange == "activeWhitespaceMode")
    {
      this.updateWhitespace();
    }
    else if (lastChange == "activeJointOwners")
    {
      // DON: Need client input, work in progress!
    }
    else if (lastChange == "activeTYDMode")
    {
      this.updateYTD();
    }
    else if (lastChange == "activeRewardsType")
    {
      // DON: Need client input, work in progress!
    }
    else if (lastChange == "activeOutboundEnvelope")
    {
      // DON: Need client input, work in progress!
    }
    else if (lastChange == "activeReplyEnvelope")
    {
      // DON: Need client input, work in progress!
    }

    // Alert system tells user what updated on the view panel when survey change is detected
    try {
      let alertBuffer :HTMLElement = document.getElementsByClassName("alert-primary")[0] as HTMLElement; 
      alertBuffer.classList.add("flash");
      alertBuffer.textContent = "Updated " + lastChange.replace("active", "");
      setTimeout(function() {
        alertBuffer.classList.remove("flash");
      }, 150);
    }
    catch {
      console.log("alertBuffer missing, alertBox missing")
    }
  }

  // Unloads all assets from all "gridSecion" divs
  unpopulateSkeleton()
  {
    var gridSectionCount = this.gridSectionCounter();
    let divCount = document.getElementsByClassName("gridSection").length;

    if (this.activeStatementType == "creditcard" && this.activeCore == "symitar")
    {
      for(var i =0; i < divCount; i++)
      {
        let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
        divChange.style.backgroundImage="";
      }
    }
    else if (this.activeStatementType == "account" && this.activeCore == "symitar")
    {
      for(var i =0; i < divCount; i++)
      {
        let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
        divChange.style.backgroundImage="";
      }
    }
  }

  // Determines how to populate the viewBox divs using the activeStatementType and activeCore variables
  populateSkeleton()
  {
    // Get all the survey flags from the build-page component
    this.getSurveyDataFromBuild();
    this.showStatements();

    // Determine whether the skeleton needs to be repopulated or not
    var lastChange = this.getParentComponent().lastChange;
    if (this.activeStatementType == "undefined")
    {
      // Pass
    }
    else if (this.activeStatementType == "creditCard" && this.activeSymitarCC == true)
    {
      // Grab the latest survey pane change and update the component accordingly
      this.makeChanges(lastChange);
      return;
    }
    else if (this.activeStatementType == "account" && this.activeSymitarReg == true)
    {
      // Grab the latest survey pane change and update the component accordingly
      this.makeChanges(lastChange);
      return;
    }

    // Populate the Symitar Credit Card skeleton if both options are selected
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard')
    {
      this.activeSymitarCC = true;
      this.activeSymitarReg = false;
      this.populateSymitarCC();
    }
    // Populate the Symitar Regular Statement skeleton if both options are selected
    else if (this.activeCore == 'symitar' && this.activeStatementType == 'account')
    {
      this.activeSymitarCC = false;
      this.activeSymitarReg = true;
      this.populateSymitarRegular();
    }
    // Safety check to alert user of missing or mismatched core and statement type
    else if (this.activeCore != "undefined" && this.activeStatementType != "undefined")
    {
      console.log("Error in populateSkeleton(): Assets not loaded, core and statementType mismatch")
      this.unpopulateSkeleton();
      alert("No assets found for selected core and statementType")
      return;
    }
  }

  // Populates the viewBox div with all default assets that are of type creditCard AND symitar
  populateSymitarCC()
  {

    // Define each HTML element to apply style changes
    let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSection")[0] as HTMLElement;
    let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSection")[0] as HTMLElement;
    let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
    let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;
    let couponSectionBuffer:HTMLElement = document.getElementsByClassName("couponSection")[0] as HTMLElement;
    let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
    // Page 2 Elements
    let logoSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2logoSection")[0] as HTMLElement;
    let headerSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2headerSection")[0] as HTMLElement;
    let onsertImagePage2Buffer:HTMLElement = document.getElementsByClassName("p2OnsertImage")[0] as HTMLElement;
    let transactionSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2TransactionSummary")[0] as HTMLElement;
    let interestChargePage2Buffer:HTMLElement = document.getElementsByClassName("p2InterestCharge")[0] as HTMLElement;
    let feeSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2FeeSummary")[0] as HTMLElement;
    let YTDSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2YTDSummary")[0] as HTMLElement;
    let whitespaceAdPage2Buffer:HTMLElement = document.getElementsByClassName("p2WhitespaceAd")[0] as HTMLElement;

    // Update assets accordingly depending on whether greyscale was chosen for activeColorMode
    if (this.activeColorMode == "undefined" || this.activeColorMode == "color")
      {
        // Load the user uploaded image before activeStatementType and activeCore are selected
        if (this.activeCustomerlogo == "undefined")
        {
          logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/defaultLogo.png)";
          logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/defaultLogo.png)";
        }
        else
        {
          this.updateCustomerlogo();
        }

        // Load the remaining assets for the selected activeStatementType and activeCore
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopGraphic.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
        couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymCoupon.png)";
        // Page 2 Elements
        onsertImagePage2Buffer.style.backgroundImage="url(../../../assets/shared/onsert2inch.png)";
        transactionSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummary.png)";
        interestChargePage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccInterestCharge.png)";
        whitespaceAdPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccWhitespaceAd.png)";
      }
      else if (this.activeColorMode == "greyscale")
      {
        // Load the user uploaded image before activeStatementType and activeCore are selected
        if (this.activeCustomerlogo == "undefined")
        {
          logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/defaultLogo.png)";
          logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/defaultLogo.png)";
        }
        else
        {
          this.updateCustomerlogo();
        }

        // Load the remaining assets for the selected activeStatementType and activeCore
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccTopGraphic.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymMidWithAll.png)";
        couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymCoupon.png)";
        // Page 2 Elements
        onsertImagePage2Buffer.style.backgroundImage="url(../../../assets/shared/grey/onsert2inch.png)";
        transactionSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccTransactionSummary.png)";
        interestChargePage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccInterestCharge.png)";
        whitespaceAdPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccWhitespaceAd.png)";
      }
    
    // These will update regardless of color settings
    addressSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/address.png)";
    headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccHeader.png)";
    scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccScanline.png)";
    headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccHeader2.png)";
    feeSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccFeeSummary.png)";
    YTDSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/YTDsummary.png)";

  }

  // Populates the viewBox div with all default assets that are of type Regular AND symitar
  populateSymitarRegular()
  {

    // Define each HTML element to apply style changes
    let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSectionLeft")[0] as HTMLElement;
    let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSectionReg")[0] as HTMLElement;
    let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSectionReg")[0] as HTMLElement;
    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSectionReg")[0] as HTMLElement;
    let AccountInfoSectionBuffer:HTMLElement = document.getElementsByClassName("AccountInfoReg")[0] as HTMLElement;
    let AccountSummaryBuffer:HTMLElement = document.getElementsByClassName("AccountSummaryReg")[0] as HTMLElement;
    let shareSavingsBuffer:HTMLElement = document.getElementsByClassName("shareSavingsReg")[0] as HTMLElement;
    let whitespaceAdBuffer:HTMLElement = document.getElementsByClassName("whitespaceAd1Reg")[0] as HTMLElement;
    // Page 2 Elements
    let p2logoSectionRegBuffer:HTMLElement = document.getElementsByClassName("p2logoSectionReg")[0] as HTMLElement;
    let p2headerSectionRegBuffer:HTMLElement = document.getElementsByClassName("p2headerSectionReg")[0] as HTMLElement;
    let FixedMortgageRegBuffer:HTMLElement = document.getElementsByClassName("FixedMortgageReg")[0] as HTMLElement;
    let HomeEquityRegBuffer:HTMLElement = document.getElementsByClassName("HomeEquityReg")[0] as HTMLElement;
    let YTDSummaryRegBuffer:HTMLElement = document.getElementsByClassName("YTDSummaryReg")[0] as HTMLElement;
    let WhitespaceAdReg1Buffer:HTMLElement = document.getElementsByClassName("WhitespaceAd2Reg")[0] as HTMLElement;
    let WhitespaceAdReg2:HTMLElement = document.getElementsByClassName("WhitespaceAd3Reg")[0] as HTMLElement;

    // Update assets accordingly depending on whether greyscale was chosen for activeColorMode
    if (this.activeColorMode == "undefined" || this.activeColorMode == "color")
    {
      // Load the user uploaded image before activeStatementType and activeCore are selected
      if (this.activeCustomerlogo == "undefined")
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/defaultLogo.png)";
        p2logoSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/defaultLogo.png)";
      }
      else
      {
        this.updateCustomerlogo();
      }

      // Load the remaining assets for the selected activeStatementType and activeCore
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/topGraphic.png)";
      AccountSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummary.png)";
      shareSavingsBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/shareSavings.png)";
      whitespaceAdBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/whitespaceAd.png)";
      // Page 2 Elements
      FixedMortgageRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/fixedMortgage.png)";
      HomeEquityRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/homeEquity.png)";
      YTDSummaryRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/YTDsummary.png)";
      WhitespaceAdReg1Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/whitespaceAd2.png)";
      WhitespaceAdReg2.style.backgroundImage="url(../../../assets/regSymitar/page5/whitespaceAd3.png)";      
    }
    else if (this.activeColorMode == "greyscale")
    {
      // Load the user uploaded image before activeStatementType and activeCore are selected
      if (this.activeCustomerlogo == "undefined")
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/defaultLogo.png)";
        p2logoSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/defaultLogo.png)";
      }
      else
      {
        this.updateCustomerlogo();
      }

      // Load the remaining assets for the selected activeStatementType and activeCore
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/topGraphic.png)";
      AccountSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummary.png)";
      shareSavingsBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/shareSavings.png)";
      whitespaceAdBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/whitespaceAd.png)";
      // Page 2 Elements
      FixedMortgageRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/fixedMortgage.png)";
      HomeEquityRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/homeEquity.png)";
      YTDSummaryRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/YTDsummary.png)";
      WhitespaceAdReg1Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/whitespaceAd2.png)";
      WhitespaceAdReg2.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/whitespaceAd3.png)";
    }

    // These will update regardless of color settings
    scanlineSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/scanlineLeft.png)";
    addressSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/address.png)";
    AccountInfoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlance.png)";
    p2headerSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/statementHeader.png)";
    
  }

  // Takes a snapshot of the viewBox div in preview pane and saves the image to a PDF through the jsPDF library
  // Readme: https://artskydj.github.io/jsPDF/docs/module-addImage.html
  printPdf()
  {
    // Hide the borders around the viewBox divs   
    for (let i = 0; i < document.getElementsByClassName("viewBox").length; i++)
    {
      let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[i] as HTMLElement; 
      let viewBoxBuffer2: HTMLElement = document.getElementsByClassName("viewBox2")[i] as HTMLElement;
      viewBoxBuffer.style.border= "2px solid rgba(0,0,0,0)";
      viewBoxBuffer2.style.border= "2px solid rgba(0,0,0,0)";
    }

    var data;
    if (this.activeSymitarCC == true)
    {
      data = document.getElementById('print');
    }
    else if (this.activeSymitarReg == true)
    {
      data = document.getElementById('print2');
    }
    console.log(data);
    html2canvas(data, { logging: true, allowTaint: false, useCORS: true, scrollX: 0, scrollY: 0}).then(canvas =>{
      // Letter is 8.5 inches by 11 inches
      var pdf = new jspdf('p', 'in','letter');
      var imgWidth = 8.5; 
      var pageHeight = 11;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight -0.5;
      var position = 0;
      const contentDataURL = canvas.toDataURL('image/png');
      console.log(contentDataURL);

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, "NONE");

      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, "NONE");
        heightLeft -= pageHeight;
      }
      pdf.save('file.pdf');
    });

    // Restore the borders around the viewBox divs  
    for (let i = 0; i < document.getElementsByClassName("viewBox").length; i++)
    {
      let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[i] as HTMLElement; 
      let viewBoxBuffer2: HTMLElement = document.getElementsByClassName("viewBox2")[i] as HTMLElement;
      viewBoxBuffer.style.border= "2px solid rgba(0,0,0,1)";
      viewBoxBuffer2.style.border= "2px solid rgba(0,0,0,1)";
    }
    
  }

  // Maniuplate the header color of the different info boxes with hex to hue filter
  changeHue()
  {
    // PATRICK: Work in progress
    var userHexNum = this.activeHexCode;
    var convertedHSL = this.hexToHSL(userHexNum);
    var degreeChange = this.hslToDegreeChange(convertedHSL);
    var hueFilter = "hue-rotate("+degreeChange[0]+"deg)";


   let divCount = document.getElementsByClassName("changeHeaderColor").length;
    for (var i = 0; i < divCount; i++)
    {
      let divChange: HTMLElement = document.getElementsByClassName("changeHeaderColor")[i] as HTMLElement;
      console.log(i+hueFilter);
      divChange.style.filter = hueFilter;
    }
  }

  // Converts hex code value into a usable HSL (hue) value
  hexToHSL(H)
  {
    // Convert hex to RGB first
    var r = parseInt(H.substr(1,2), 16);
    var g = parseInt(H.substr(3,2), 16);
    var b = parseInt(H.substr(5,2), 16);

    // Then to HSL
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // Logic to decide which hue is dominant
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // If hue is negative, make it positive
    if (h < 0)
      h += 360;

    //some conversions necessary to find S and L values
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100);
    l = +(l * 100);


    return [h,s,l];
  }

  // Once the HSL is found it needs to be calculated away from the original
 hslToDegreeChange(convertedHSL:number[]){
  let startH = 203, startS = 240, startL = 160;
  let newH = convertedHSL[0]- startH, 
    newS = 100 + (startS -convertedHSL[1]),
    newL = 100 + (convertedHSL[2] - startL);
  let resultHSL: number[] = [newH, newS, newL];
  return resultHSL;
 }

  // Uses variable activeCClogo and changes view accordingly upon update from the survey pane
  updateCClogo()
  {
    let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
    if (this.activeCClogo == "none")
    {
      ccLogoSectionBuffer.style.backgroundImage="";
    }
    else if (this.activeCClogo == "visa")
    {
      if (this.activeColorMode == "greyscale")
      {
        ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/grey/ccVisaLogo.png)";
      }
      else
      {
        ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/ccVisaLogo.png)";
      }
    }
    else if (this.activeCClogo == "mastercard")
    {
      if (this.activeColorMode == "greyscale")
      {
        ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/grey/ccMastercardLogo.png)";
      }
      else
      {
        ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/ccMastercardLogo.png)";
      }
    }
  }

  // Uses variable activeCustomerlogo containing firebase storage link after customer logo submission on survey-pane
  updateCustomerlogo()
  {
    // Don't update unless activeStatementType and activeCore are chosen
    if (this.activeStatementType == "undefined" || this.activeCore == "undefined")
      return;
    
    // Gather information about which divs to update depending on chosen statement type and core
    var logoSectionBuffer;
    var logoSectionPage2Buffer;
    if (this.activeStatementType == "creditCard" && this.activeCore == "symitar")
    {
      // Define the HTML Elements where the customer logo should go
      logoSectionBuffer = document.getElementsByClassName("logoSection")[0] as HTMLElement;
      logoSectionPage2Buffer = document.getElementsByClassName("p2logoSection")[0] as HTMLElement;
    }
    else if (this.activeStatementType == "account" && this.activeCore == "symitar")
    {
      // Define the HTML Elements where the customer logo should go
      logoSectionBuffer = document.getElementsByClassName("logoSectionReg")[0] as HTMLElement;
      logoSectionPage2Buffer = document.getElementsByClassName("p2logoSectionReg")[0] as HTMLElement;
    }

    // If customer logo is uploaded, populate HTML Elements
    if (this.activeCustomerlogo != "undefined")
    {
      if (this.activeStatementType == "creditCard" && this.activeCore == "symitar")
      {
        // Place the customer uploaded logo
        logoSectionBuffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
        logoSectionPage2Buffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
      }
      else if (this.activeStatementType == "account" && this.activeCore == "symitar")
      {
        // Place the customer uploaded logo
        logoSectionBuffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
        logoSectionPage2Buffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
      }
      // grey
      // https://codepen.io/duketeam/pen/ALEByA
    }
    else
    {
      // Determine activeColorMode and populate elements accordingly
      if (this.activeColorMode == "greyscale")
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/defaultLogo.png)";
        logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/defaultLogo.png)";
      }
      else
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/defaultLogo.png)";
        logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/defaultLogo.png)";
      }
    }
  }

  // Uses variable activeMaskType and changes view accordingly upon update from the survey pane
  updateMasking()
  {
    // Determine which divs to update
    var headerSectionBuffer:HTMLElement;
    var headerSectionPage2Buffer:HTMLElement;

    // Make the changes to the account masking in the headers on both pages
    if (this.activeSymitarCC)
    {
      headerSectionBuffer = document.getElementsByClassName("headerSection")[0] as HTMLElement;
      headerSectionPage2Buffer = document.getElementsByClassName("p2headerSection")[0] as HTMLElement;
      if (this.activeMaskType == "none")
      {
        headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccHeader.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccHeader2.png)";
      }
      else if (this.activeMaskType == "to3")
      {
        headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccHeaderMaskTo3.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccHeader2MaskTo3.png)";
      }
      else if (this.activeMaskType == "to4")
      {
        headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccHeaderMaskTo4.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccHeader2MaskTo4.png)";
      }
    }
    else if (this.activeSymitarReg)
    {
      headerSectionBuffer = document.getElementsByClassName("AccountInfoReg")[0] as HTMLElement;
      headerSectionPage2Buffer = document.getElementsByClassName("p2headerSectionReg")[0] as HTMLElement;
      if (this.activeMaskType == "none")
      {
        if (this.activeGlance != "off")
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlance.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/statementHeader.png)";
      }
      else if (this.activeMaskType == "to3")
      {
        if (this.activeGlance != "off")
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlanceMaskTo3.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/statementHeaderMaskTo3.png)";
      }
      else if (this.activeMaskType == "to4")
      {
        if (this.activeGlance != "off")
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlanceMaskTo4.png)";
        headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/statementHeaderMaskTo4.png)";
      }
    }
  }

  // Uses variable activeScanline and changes view accordingly upon update from the survey pane
  updateScanline()
  {
    // Determine which div to update
    var scanlineSectionBuffer:HTMLElement;
    if (this.activeStatementType == "creditCard")
    {
      scanlineSectionBuffer = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
    }
    else
    {
      scanlineSectionBuffer = document.getElementsByClassName("scanlineSectionLeft")[0] as HTMLElement;
    }

    // Update the div accordingly with user input from activeScanline and activeStatementType
    if (this.activeScanline == "yes")
    {
      if (this.activeStatementType == "creditCard")
      {
        scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccScanline.png)";
      }
      else
      {
        scanlineSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/scanlineLeft.png)";
      }
    }
    else if (this.activeScanline == "no")
    {
      scanlineSectionBuffer.style.backgroundImage="";
    }
  }

  // Uses variable activeOnsert to update the onsert graphic div or move other divs to its place
  updateOnsert()
  {
    if (this.activeSymitarCC)
    {
      // Determine which divs to update
      var onsertContainer:HTMLElement = document.getElementById("onsertCollapse") as HTMLElement;
      var whitespaceContainer:HTMLElement = document.getElementById("whitespaceCollapse") as HTMLElement;
      var onsertBuffer:HTMLElement = document.getElementsByClassName("p2OnsertImage")[0] as HTMLElement;
      // Make changes and move divs if needed
      if (this.activeOnsert == "image")
      {
        if (this.activeColorMode != "greyscale")
        {
          onsertBuffer.style.backgroundImage="url(../../../assets/shared/onsert2inch.png)";
        }
        else
        {
          onsertBuffer.style.backgroundImage="url(../../../assets/shared/grey/onsert2inch.png)";
        }
        whitespaceContainer.classList.add("collapse");
        onsertContainer.classList.remove("collapse");
      }
      else if (this.activeOnsert == "textonly")
      {
        whitespaceContainer.classList.add("collapse");
        onsertContainer.classList.remove("collapse");
        onsertBuffer.style.backgroundImage="url(../../../assets/shared/onsertText2inch.png)";
      }
      else if (this.activeOnsert == "none")
      {
        whitespaceContainer.classList.remove("collapse");
        onsertContainer.classList.add("collapse");
      }
    }
    else if (this.activeSymitarReg)
    {
      // Determine which div to update
      var onsertBuffer:HTMLElement = document.getElementsByClassName("WhitespaceAd2Reg")[0] as HTMLElement;
      // Make changes and move divs if needed
      if (this.activeOnsert == "image")
      {
        if (this.activeColorMode != "greyscale")
        {
          onsertBuffer.style.backgroundImage="url(../../../assets/shared/onsert2inch.png)";
        }
        else
        {
          onsertBuffer.style.backgroundImage="url(../../../assets/shared/grey/onsert2inch.png)";
        }
      }
      else if (this.activeOnsert == "textonly")
      {
        onsertBuffer.style.backgroundImage="url(../../../assets/shared/onsertText2inch.png)";
      }
      else if (this.activeOnsert == "none")
      {
        onsertBuffer.style.backgroundImage="";
      }
    }
  }

  // Uses variable activeNewsflash to update the newsflash graphic div or move other divs to its place
  updateNewsflash()
  {
    // Define the HTML Elements where the News Flash should go
    let NewsflashType:HTMLElement = document.getElementsByClassName("whitespaceAd1Reg")[0] as HTMLElement;

    // Replace with grouped separate account summary component (“skeleton sample” will have all shares and loans in one group)
    if (this.activeNewsflash == "yes")
    {
      if (this.activeColorMode == "greyscale")
      {
        NewsflashType.style.backgroundImage="url(../../../assets/shared/grey/newsflash.png)";
      }
      else if (this.activeColorMode == "color")
      {
        NewsflashType.style.backgroundImage="url(../../../assets/shared/newsflash.png)";
      }
    }
    // Replace News Flash with original whitespaceAd
    else if (this.activeNewsflash == "no")
    {
      if (this.activeColorMode == "greyscale")
      {
        NewsflashType.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/whitespaceAd.png)";
      }
      else if (this.activeColorMode == "color")
      {
        NewsflashType.style.backgroundImage="url(../../../assets/regSymitar/page1/whitespaceAd.png)";
      }
    }
    else if (this.activeNewsflash == "no" && this.activeWhitespaceMode == "no")
    {
      NewsflashType.style.backgroundImage = " ";
    }
  }

  // Uses variable activeGlance to toggle visibility on the top right div for Summary at a Glance component
  updateGlance()
  {
    // Updates Glance toggle visibility
    var headerSectionBuffer:HTMLElement;
  
    if (this.activeStatementType == "account")
    {
      headerSectionBuffer = document.getElementsByClassName("AccountInfoReg")[0] as HTMLElement;
    }
    if (this.activeStatementType == "account")
    {
      if(this.activeGlance == "on")
      {
        if (this.activeMaskType == "none" || this.activeMaskType == "undefined")
        {
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlance.png)";
        }
        else if (this.activeMaskType == "to3")
        {
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlanceMaskTo3.png)";
        }
        else if(this.activeMaskType == "to4")
        {
          headerSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountGlanceMaskTo4.png)";
        }
      }
      else if (this.activeGlance == "off")
      {
        headerSectionBuffer.style.backgroundImage="";
      }
    }
  }

  // Uses variable activeAccSum to update the Account Summary graphic div or move other divs to its place
  updateAccountSummary()
  {
    // Define the HTML Elements where the Account Summary should go
    let AccountSummaryReg:HTMLElement = document.getElementsByClassName("AccountSummaryReg")[0] as HTMLElement;

    // Replace with grouped separate account summary component (“skeleton sample” will have all shares and loans in one group)
    if (this.activeAccSum == "group")
    {
      if (this.activeColorMode == "greyscale")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummary.png)";
      }
      else if (this.activeColorMode == "color")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummary.png)";
      }
    }
    // No change, already on “skeleton sample”
    else if (this.activeAccSum == "startingbalance")
    {
      if (this.activeColorMode == "greyscale")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummaryStartingBal.png)";
      }
      else if (this.activeColorMode == "color")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummaryStartingBal.png)";
      }
    }
    // Replace with Ending Balance Only account summary component
    else if (this.activeAccSum == "endingbalance")
    {
      if (this.activeColorMode != "greyscale")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummaryEndingBal.png)";
      }
      else
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummaryEndingBal.png)";
      }
    }
    // Replace with Full account summary component
    else if (this.activeAccSum == "total")
    {
      if (this.activeColorMode == "greyscale")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummary.png)";
      }
      else if (this.activeColorMode == "color")
      {
        AccountSummaryReg.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummary.png)";
      }
    }
  }

  // Uses variable activeMarketingLevel and changes view accordingly upon update from the survey pane
  updateMarketing()
  {
    // Determine which divs to update
    var topGraphicSectionBuffer:HTMLElement;
    var ccMidSectionBuffer:HTMLElement;
    if (this.activeSymitarCC)
    {
      topGraphicSectionBuffer = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
      ccMidSectionBuffer = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;
    }
    else if (this.activeSymitarReg)
    {
      topGraphicSectionBuffer = document.getElementsByClassName("topGraphicSectionReg")[0] as HTMLElement;
    }

    // Make the changes depending on activeMarketingLevel and the activeStatementType
    if (this.activeMarketingLevel == "imageOnly")
    {
      if (this.activeColorMode != "greyscale")
      {
        if (this.activeSymitarCC)
        {
          topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopGraphic.png)";
          ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
        }
        else if (this.activeSymitarReg)
        {
          topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/topGraphic.png)";
        }
      }
      else
      {
        if (this.activeSymitarCC)
        {
          topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccTopGraphic.png)";
          ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
        }
        else if (this.activeSymitarReg)
        {
          topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/topGraphic.png)";
        }
      }
    }
    else if (this.activeMarketingLevel == "text")
    {
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/shared/topMarketingText.png)";
    }
    else if (this.activeMarketingLevel == "contactInfo" && this.activeSymitarCC)
    {
      if (this.activeColorMode != "greyscale")
      {
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopContactInfo.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithoutContactInfo.png)";
      }
      else
      {
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccTopContactInfo.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymMidWithoutContactInfo.png)";
      }
    }
    else if (this.activeMarketingLevel == "none")
    {
      if (this.activeColorMode != "greyscale")
      {
        topGraphicSectionBuffer.style.backgroundImage="";
        if (this.activeSymitarCC)
          ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
      }
      else
      {
        topGraphicSectionBuffer.style.backgroundImage="";
        if (this.activeSymitarCC)
          ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymMidWithAll.png)";
      }
    }
  }

  // Uses varaible activeTransactionsMode to update the Transaction Summary on page 2
  updateTransactionSummary()
  {
    // Determine which div to update
    var TransactionBuffer:HTMLElement;
    if (this.activeStatementType == "creditCard")
    {
      TransactionBuffer = document.getElementsByClassName("p2TransactionSummary")[0] as HTMLElement;
    }
    else
    {
      TransactionBuffer = document.getElementsByClassName("shareSavingsReg")[0] as HTMLElement;
    }

    // Update the div accordingly with user input from activeTransactionsMode and activeStatementType
    if (this.activeSymitarCC)
    {
      if (this.activeTransactionsMode == "nochange")
      {
        if (this.activeColorMode != "greyscale")
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummary.png)";
        }
        else
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccTransactionSummary.png)";
        }
      }
      else if (this.activeTransactionsMode == "amountonly")
      {
        if (this.activeColorMode != "greyscale")
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummaryAmountOnly.png)";
        }
        else
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccTransactionSummaryAmountOnly.png)";
        }
      }
    }
    else if (this.activeSymitarReg)
    {
      if (this.activeTransactionsMode == "balanceRight") // Default
      {
        if (this.activeColorMode != "greyscale")
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/shareSavings.png)";
        }
        else
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/shareSavings.png)";
        }
      }
      else if (this.activeTransactionsMode == "balanceLeft")
      {
        if (this.activeColorMode != "greyscale")
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/shareSavingsBalLeft.png)";
        }
        else
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/shareSavingsBalLeft.png)";
        }
      }
      else if (this.activeTransactionsMode == "amountonly")
      {
        if (this.activeColorMode != "greyscale")
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/shareSavingsAmountOnly.png)";
        }
        else
        {
          TransactionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/shareSavingsAmountOnly.png)";
        }
      }
    }
  }

  // Uses varaible activeTYDMode to change the YTD summary component on page 2
  updateYTD()
  {
    // Determine which div to update
    var YTDSummaryBuffer:HTMLElement;
    if (this.activeStatementType == "creditCard")
    {
      YTDSummaryBuffer = document.getElementsByClassName("p2YTDSummary")[0] as HTMLElement;
    }
    else
    {
      YTDSummaryBuffer = document.getElementsByClassName("YTDSummaryReg")[0] as HTMLElement;
    }
    
    // Update the div accordingly with user input from activeTYDMode and activeStatementType
    if (this.activeTYDMode == "current")
    {
      if (this.activeSymitarCC) // Has no header color
      {
        YTDSummaryBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/YTDsummary.png)";
      }
      else if (this.activeSymitarReg) // Has color
      {
        if (this.activeColorMode != "greyscale")
        {
          YTDSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/YTDsummary.png)";
        }
        else
        {
          YTDSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/YTDsummary.png)";
        }
      }
    }
    else if (this.activeTYDMode == "currentandprevious")
    {
      if (this.activeSymitarCC) // Has no header color
      {
        YTDSummaryBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/YTDcurrentAndprevious.png)";
      }
      else if (this.activeSymitarReg) // Has color
      {
        if (this.activeColorMode != "greyscale")
        {
          YTDSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/YTDsummaryPrev.png)";
        }
        else
        {
          YTDSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/YTDsummaryPrev.png)";
        }
      }
    }
  }

  // Uses varaible activeWhitespace to change the advertisement on page 2
  updateWhitespace()
  {
    // Choose which divs to affect based on which statement combination is currently chosen
    var whitespaceAdPage1:HTMLElement;
    var whitespaceAdPage2:HTMLElement;
    if (this.activeSymitarCC)
    {
      whitespaceAdPage2 = document.getElementsByClassName("p2WhitespaceAd")[0] as HTMLElement;
    }
    else if (this.activeSymitarReg)
    {
      whitespaceAdPage1 = document.getElementsByClassName("whitespaceAd1Reg")[0] as HTMLElement;
      whitespaceAdPage2 = document.getElementsByClassName("WhitespaceAd3Reg")[0] as HTMLElement;
    }

    // Makes the changes according to activeStatementType, activeCore, activeColorMode, and activeWhitespaceMode
    if (this.activeWhitespaceMode == "yes")
    {
      if (this.activeSymitarCC)
      {
        if (this.activeColorMode != "greyscale")
        {
          whitespaceAdPage2.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccWhitespaceAd.png)";
        }
        else
        {
          whitespaceAdPage2.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/ccWhitespaceAd.png)";
        }
      }
      else if (this.activeSymitarReg)
      {
        if (this.activeColorMode != "greyscale")
        {
          whitespaceAdPage1.style.backgroundImage="url(../../../assets/regSymitar/page1/whitespaceAd.png)";
          whitespaceAdPage2.style.backgroundImage="url(../../../assets/regSymitar/page5/whitespaceAd3.png)";
        }
        else
        {
          whitespaceAdPage1.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/whitespaceAd.png)";
          whitespaceAdPage2.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/whitespaceAd3.png)";
        }
      }
    }
    else if (this.activeWhitespaceMode == "no")
    {
      if (this.activeSymitarReg)
      {
        whitespaceAdPage1.style.backgroundImage="";
      }
      whitespaceAdPage2.style.backgroundImage="";
    }
  }

  // Shows the correct statement type view boxs depending on activeStatementType
  showStatements()
  {
    var symCC: HTMLElement = document.getElementById("print") as HTMLElement;
    var symReg: HTMLElement = document.getElementById("print2") as HTMLElement;

    if (this.activeCore == "symitar" && this.activeStatementType == "creditCard")
    {
      symCC.classList.remove("collapse");
      symReg.classList.add("collapse");
    }
    else
    {
      symCC.classList.add("collapse");
      symReg.classList.remove("collapse");
    }
  }

  // Sets focus on Account Summary question card in the survey component
  AccountSummaryClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "accountSummaryTypeCard";
    this.outputPreviewClick.emit("AccountSummary");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on Credit Card Logo question card in the survey component
  cclogoSelectionClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "cclogoSelectionCard";
    this.outputPreviewClick.emit("ccLogo");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on Customer Logo question card in the survey component
  CustomerLogoSectionClick()
  { 
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "upLoadcustomerLogoCard";
    this.outputPreviewClick.emit("CustomerLogo");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on Balance at a Glance question card in the survey component
  // Currently not being used as (click)="MaskingTypeClick()" already is
  GlanceBalanceClick()
  { 
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "glanceTypeCard";
    this.outputPreviewClick.emit("GlanceBalanceType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Marketing Type question card in the survey component
  MarketingTypeClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "marketingTypeCard";
    this.outputPreviewClick.emit("MarketingType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Masking Type question card in the survey component
  MaskingTypeClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "maskingTypeCard";
    this.outputPreviewClick.emit("MaskingType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Newsflash question card in the survey component
  NewsflashTypeClick()
  { 
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "newsflashTypeCard";
    this.outputPreviewClick.emit("Newsflash");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Onsert Type question card in the survey component
  OnsertTypeClick()
  { 
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "onsertTypeCard";
    this.outputPreviewClick.emit("OnserType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Scanline Type question card in the survey component
  ScanlineTypeClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "scanlineTypeCard";
    this.outputPreviewClick.emit("ScanlineType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Transaction Summary Type question card in the survey component
  TransactionSummaryClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "transactionSummaryTypeCard";
    this.outputPreviewClick.emit("TransactionSummary");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the Transaction Summary Type question card in the survey component
  // Currently not being used as (click)="NewsflashTypeClick()" already is
  WhitespaceClick()
  {
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "whitespaceTypeCard";
    this.outputPreviewClick.emit("WhitespaceType");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sets focus on the YTDSummary question card in the survey component
  YTDSummaryClick()
  { 
    //Set shared variable to card ID 
    this.clickedPreviewFlag = "YTDTypeCard";
    this.outputPreviewClick.emit("YTDSummaryReg");
    // Notify build page to notify survey page
    this.emitPreviewClick(this.clickedPreviewFlag );
  }

  // Sends data to build page to send to survey page
  emitPreviewClick(clickedPreviewFLag)
  {
    this.outputPreviewFlag.emit(clickedPreviewFLag);
  }

  // Anything that should be set on page load goes in ngOnInit() 
  ngOnInit()
  {

  }

}