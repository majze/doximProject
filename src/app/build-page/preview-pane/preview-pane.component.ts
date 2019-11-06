import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {
  combinedFlags: string;
  activeCore: string;
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

  // Creates the viewContainerRef class to link itself to its parent (build-page)
  constructor(private viewContainerRef: ViewContainerRef) { }

  // Any call to this function gets the build-page (parent) variables
  getParentComponent(): BuildPageComponent
  {
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
  }

  // DON: yo,
  // Before commenting on these getters, do we need them? Or can we safely dump them into getSurveyDataFromBuild() ???
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

  getCClogo()
  {
    this.activeCClogo = this.getParentComponent().activeCClogo;
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
    this.getCClogo();
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

  // Applies or removes greyscale filter to all "gridSection" divs based on status of variable "activeColorMode"
  updateColorMode()
  {
    var gridSectionCount = 17;

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
      alertBuffer.textContent = "Updated " + val.replace("active","");
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
    for(var i =0; i <16; i++)
    {
      let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
      divChange.style.backgroundImage="";
    }
  }

  // Determines how to populate the viewBox divs using the activeStatementType and activeCore variables
  popSkele()
  {
    this.getSurveyDataFromBuild()
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard')
    {
      this.populateSymitarCC();
      this.updateAlert(this.getParentComponent().lastChange);
      this.changeCClogo();
      this.updateColorMode();
      this.updateMasking();
      this.updateScanline();
      this.updateMarketing();
      this.updateTransactionSummary();
      this.updateYTD();
      this.updateWhitespace();
    }
    else
    {
      if (this.activeCore != "undefined" && this.activeStatementType != "undefined")
      {
        console.log("preview: popSkele: Assets not loaded, core and statementType mismatch")
        this.unpopulateSkeleton();
        alert("No assets found for selected core and statementType")
      }
    }
  }

  // Populates the viewBox div with all default assets that are of type creditCard AND symitar
  populateSymitarCC()
  {
    let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSection")[0] as HTMLElement;
    logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/defaultLogo.png)";

    let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSection")[0] as HTMLElement;
    addressSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/address.png)";
    
    let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
    headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccHeader.png)";

    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
    topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccTopGraphic.png)";

    let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;
    ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymMidWithAll.png)";

    let couponSectionBuffer:HTMLElement = document.getElementsByClassName("couponSection")[0] as HTMLElement;
    couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccSymCoupon.png)";

    let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
    scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/ccScanline.png)";

    // Page 2 Elements

    let logoSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2logoSection")[0] as HTMLElement;
    logoSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/defaultLogo.png)";
    
    let headerSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2headerSection")[0] as HTMLElement;
    headerSectionPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccHeader2.png)";

    let transactionSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2TransactionSummary")[0] as HTMLElement;
    transactionSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccTransactionSummary.png)";

    let interestChargePage2Buffer:HTMLElement = document.getElementsByClassName("p2InterestCharge")[0] as HTMLElement;
    interestChargePage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccInterestCharge.png)";

    let feeSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2FeeSummary")[0] as HTMLElement;
    feeSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccFeeSummary.png)";

    let YTDSummaryPage2Buffer:HTMLElement = document.getElementsByClassName("p2YTDSummary")[0] as HTMLElement;
    YTDSummaryPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/YTDsummary.png)";

    let whitespaceAdPage2Buffer:HTMLElement = document.getElementsByClassName("p2WhitespaceAd")[0] as HTMLElement;
    whitespaceAdPage2Buffer.style.backgroundImage="url(../../../assets/ccSymitar/page2/ccWhitespaceAd.png)";
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
    html2canvas(data).then(canvas =>{
      // Letter is 8.5 inches by 11 inches
      var pdf = new jspdf('p', 'in','letter');
      var imgWidth = 8.5; 
      var pageHeight = 11;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight -0.5;
      
      var position = 0;
      const contentDataURL = canvas.toDataURL('image/png');
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

  // Uses variable activeCClogo and changes view accordingly upon update from the survey pane
  changeCClogo()
  {
    let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
    if (this.activeCClogo == "none")
    {
      ccLogoSectionBuffer.style.backgroundImage="";
    }
    else if (this.activeCClogo == "visa")
    {
      ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/ccVisaLogo.png)";
    }
    else if (this.activeCClogo == "mastercard")
    {
      ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/shared/ccMastercardLogo.png)";
    }
  }

  // Uses variable activeMaskType and changes view accordingly upon update from the survey pane
  updateMasking()
  {
    let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
    let headerSectionPage2Buffer:HTMLElement = document.getElementsByClassName("p2headerSection")[0] as HTMLElement;
    
    if (this.activeMaskType == "none")
    {
      headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/page1/page1/ccHeader.png)";
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