import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {
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
  activeTransactionsMode: string;
  activeWhitespaceMode: string;
  activeJointOwners: string;
  activeTYDMode: string;
  activeRewardsType: string;
  activeOutboundEnvelope: string;
  activeReplyEnvelope: string;

  // Creates the viewContainerRef class to link itself to its parent (build-page)
  constructor(private viewContainerRef: ViewContainerRef) { }

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
  }

  // Alert system tells user what updated on the view panel when survey change is detected
  updateAlert(val)
  {
    try {
      let alertBuffer :HTMLElement = document.getElementsByClassName("alert-primary")[0] as HTMLElement; 
      alertBuffer.classList.add("flash");
      alertBuffer.textContent = "Updated " + val.replace("active", "");
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

    // Populate the Symitar Credit Card skeleton if both options are selected
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard')
    {
      this.populateSymitarCC();
    }
    // Populate the Symitar Regular Statement skeleton if both options are selected
    else if (this.activeCore == 'symitar' && this.activeStatementType == 'account')
    {
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

    // Grab all survey pane changes and update components accordingly
    this.updateAlert(this.getParentComponent().lastChange);
    this.updateCClogo();
    this.updateColorMode();
    this.updateCustomerlogo();
    this.updateMasking();
    this.updateScanline();
    this.updateMarketing();
    this.updateTransactionSummary();
    this.updateYTD();
    this.updateWhitespace();
    this.changeHue();
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
    let transactionSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2TransactionSummary")[0] as HTMLElement;
    let interestChargePage2Buffer:HTMLElement = document.getElementsByClassName("p2InterestCharge")[0] as HTMLElement;
    let feeSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2FeeSummary")[0] as HTMLElement;
    let YTDSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2YTDSummary")[0] as HTMLElement;
    let whitespaceAdPage2Buffer:HTMLElement = document.getElementsByClassName("p2WhitespaceAd")[0] as HTMLElement;

    // Update assets accordingly depending on whether greyscale was chosen for activeColorMode
    if (this.activeColorMode == "undefined" || this.activeColorMode == "color")
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/defaultLogo.png)";
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopGraphic.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
        couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymCoupon.png)";
        // Page 2 Elements
        logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/defaultLogo.png)";
        transactionSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummary.png)";
        interestChargePage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccInterestCharge.png)";
        whitespaceAdPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccWhitespaceAd.png)";
      }
      else if (this.activeColorMode == "greyscale")
      {
        logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/defaultLogo.png)";
        topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccTopGraphic.png)";
        ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymMidWithAll.png)";
        couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/grey/ccSymCoupon.png)";
        // Page 2 Elements
        logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/grey/defaultLogo.png)";
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
    // let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSectionLeft")[0] as HTMLElement;
    // scanlineSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/scanlineLeft.png)";
    let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSectionReg")[0] as HTMLElement;
    let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSectionReg")[0] as HTMLElement;
    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSectionReg")[0] as HTMLElement;
    let AccountInfoSectionBuffer:HTMLElement = document.getElementsByClassName("AccountInfoReg")[0] as HTMLElement;
    let AccountSummaryBuffer:HTMLElement = document.getElementsByClassName("AccountSummaryReg")[0] as HTMLElement;
    let shareSavingsBuffer:HTMLElement = document.getElementsByClassName("shareSavingsReg")[0] as HTMLElement;
    let whitespaceAdBuffer:HTMLElement = document.getElementsByClassName("whitespaceAdReg")[0] as HTMLElement;
    // Page 2 Elements
    let p2logoSectionRegBuffer:HTMLElement = document.getElementsByClassName("p2logoSectionReg")[0] as HTMLElement;
    let p2headerSectionRegBuffer:HTMLElement = document.getElementsByClassName("p2headerSectionReg")[0] as HTMLElement;
    let FixedMortgageRegBuffer:HTMLElement = document.getElementsByClassName("FixedMortgageReg")[0] as HTMLElement;
    let HomeEquityRegBuffer:HTMLElement = document.getElementsByClassName("HomeEquityReg")[0] as HTMLElement;
    let YTDSummaryRegBuffer:HTMLElement = document.getElementsByClassName("YTDSummaryReg")[0] as HTMLElement;
    let WhitespaceAdReg1Buffer:HTMLElement = document.getElementsByClassName("WhitespaceAdReg1")[0] as HTMLElement;
    let WhitespaceAdReg2:HTMLElement = document.getElementsByClassName("WhitespaceAdReg2")[0] as HTMLElement;

    // Update assets accordingly depending on whether greyscale was chosen for activeColorMode
    if (this.activeColorMode == "undefined" || this.activeColorMode == "color")
    {
      logoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/defaultLogo.png)";
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/topGraphic.png)";
      AccountSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountSummary.png)";
      shareSavingsBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/shareSavings.png)";
      whitespaceAdBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/whitespaceAd.png)";
      // Page 2 Elements
      p2logoSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/defaultLogo.png)";
      FixedMortgageRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/fixedMortgage.png)";
      HomeEquityRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/homeEquity.png)";
      YTDSummaryRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/YTDsummary.png)";
      WhitespaceAdReg1Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/whitespaceAd2.png)";
      WhitespaceAdReg2.style.backgroundImage="url(../../../assets/regSymitar/page5/whitespaceAd3.png)";      
    }
    else if (this.activeColorMode == "greyscale")
    {
      logoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/defaultLogo.png)";
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/topGraphic.png)";
      AccountSummaryBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/accountSummary.png)";
      shareSavingsBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/shareSavings.png)";
      whitespaceAdBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/grey/whitespaceAd.png)";
      // Page 2 Elements
      p2logoSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/defaultLogo.png)";
      FixedMortgageRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/fixedMortgage.png)";
      HomeEquityRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/homeEquity.png)";
      YTDSummaryRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/YTDsummary.png)";
      WhitespaceAdReg1Buffer.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/whitespaceAd2.png)";
      WhitespaceAdReg2.style.backgroundImage="url(../../../assets/regSymitar/page5/grey/whitespaceAd3.png)";
    }

    // These will update regardless of color settings
    addressSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/address.png)";
    AccountInfoSectionBuffer.style.backgroundImage="url(../../../assets/regSymitar/page1/accountInfo.png)";
    p2headerSectionRegBuffer.style.backgroundImage="url(../../../assets/regSymitar/page5/statementHeader.png)";
    
  }

  // Takes a snapshot of the viewBox div in preview pane and saves the image to a PDF through the jsPDF library
  // Readme: https://artskydj.github.io/jsPDF/docs/module-addImage.html
  printPdf()
  {
    // Hide the borders around the viewBox divs
    let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[0] as HTMLElement; 
    let viewBoxBuffer2: HTMLElement = document.getElementsByClassName("viewBox2")[0] as HTMLElement;
    viewBoxBuffer.style.border= "2px solid rgba(0,0,0,0)";
    viewBoxBuffer2.style.border= "2px solid rgba(0,0,0,0)";

    var data = document.getElementById('print');
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
    viewBoxBuffer.style.border= "2px solid rgba(0,0,0,1)";
    viewBoxBuffer2.style.border= "2px solid rgba(0,0,0,1)";
  }

  // Maniuplate the header color of the different info boxes with hex to hue filter
  changeHue()
  {
    // PATRICK: Work in progress
    // var userHexNum = this.activeHexCode;
    // var convertedHSL = this.hexToHSL(userHexNum);
    // var hueChange = this.hslToDegreeChange(convertedHSL)
    
    var testnum = 27, testnum1=112, testnum2 = 115;
    var filter1 = "hue-rotate("+testnum+"deg) saturate("+testnum1+"%) brightness("+testnum2+"%)";

    let divCount = document.getElementsByClassName("changeHeaderColor").length;
    for (var i = 0; i < divCount; i++)
    {
      let divChange: HTMLElement = document.getElementsByClassName("changeHeaderColor")[i] as HTMLElement;
      divChange.style.filter = filter1;
    }
    console.log("Applied hue change with: testnum"); // + this.activeHexCode);
  }

  // Converts hex code value into a usable HSL (hue) value
  hexToHSL(H)
  {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r =  H[1] + H[1];
      g =  H[2] + H[2];
      b =  H[3] + H[3];
    }
    else if (H.length == 7) {
      r =  H[1] + H[2];
      g =  H[3] + H[4];
      b =  H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    let hslArray: number[] = [h,s,l]
    return hslArray;
  }

  // Once the HSL is found it needs to be calculated away from the original
 hslToDegreeChange(convertedHSL:number[]){
  let startH = 195, startS = 100, startL = 44.1;
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
    // Define the HTML Elements where the customer logo should go
    let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSection")[0] as HTMLElement;
    let logoSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2logoSection")[0] as HTMLElement;
    
    // Don't update unless activeStatementType and activeCore are chosen
    if (this.activeStatementType == "undefined" || this.activeCore == "undefined")
      return;

    // If customer logo is uploaded, populate HTML Elements
    if (this.activeCustomerlogo != "undefined")
    {
      logoSectionBuffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
      logoSectionPage2Buffer.style.backgroundImage="url('" + this.activeCustomerlogo + "')";
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
    let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
    let headerSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2headerSection")[0] as HTMLElement;
    
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

  // Uses variable activeScanline and changes view accordingly upon update from the survey pane
  updateScanline()
  {
    let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
    if (this.activeScanline == "yes")
    {
      scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccScanline.png)";
    }
    else if (this.activeScanline == "no")
    {
      scanlineSectionBuffer.style.backgroundImage="";
    }
  }

  // Uses variable activeMarketingLevel and changes view accordingly upon update from the survey pane
  updateMarketing()
  {
    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
    let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;

    if (this.activeMarketingLevel == "imageOnly")
    {
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopGraphic.png)";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
    }
    else if (this.activeMarketingLevel == "contactInfo")
    {
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopContactInfo.png)";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithoutContactInfo.png)";
    }
    else if (this.activeMarketingLevel == "none")
    {
      topGraphicSectionBuffer.style.backgroundImage="";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";
    }
  }

  // Uses varaible activeTransactionsMode to update the Transaction Summary on page 2
  updateTransactionSummary()
  {
    let TransactionPage2Buffer:HTMLElement = document.getElementsByClassName("p2TransactionSummary")[0] as HTMLElement;
    if (this.activeTransactionsMode == "yes")
    {
      TransactionPage2Buffer.style.display = "block";
      TransactionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummary.png)";
    }
    else if (this.activeTransactionsMode == "no")
    {
      TransactionPage2Buffer.style.backgroundImage="";
      TransactionPage2Buffer.style.display = "none";
    }
  }

  // Uses varaible activeWhitespace to change the advertisement on page 2
  updateYTD()
  {
    let YTDSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2YTDSummary")[0] as HTMLElement;
    if (this.activeTYDMode == "yes")
    {
      YTDSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/YTDsummary.png)";
    }
    else if (this.activeTYDMode == "no")
    {
      YTDSummaryPage2Buffer.style.backgroundImage="";
    }
  }

  // Uses varaible activeWhitespace to change the advertisement on page 2
  updateWhitespace()
  {
    let whitespaceAdPage2Buffer:HTMLElement = document.getElementsByClassName("p2WhitespaceAd")[0] as HTMLElement;
    if (this.activeWhitespaceMode == "yes")
    {
      whitespaceAdPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccWhitespaceAd.png)";
    }
    else if (this.activeWhitespaceMode == "no")
    {
      whitespaceAdPage2Buffer.style.backgroundImage="";
    }
  }

  // Anything that should be set on page load goes in ngOnInit() 
  ngOnInit()
  {

  }

}