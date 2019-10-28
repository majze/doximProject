import { Component, OnInit, ElementRef, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

function populateSymitarCC()
{
  let paperContainerBuffer:HTMLElement = document.getElementsByClassName("paperContainer")[0] as HTMLElement;
  paperContainerBuffer.style.border="none";

  let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSection")[0] as HTMLElement;
  logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/defaultLogo.png)";

  let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSection")[0] as HTMLElement;
  addressSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/address.png)";
  
  // let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
  // ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccVisaLogo.png)";

  let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
  headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccHeader.png)";

  let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
  topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccTopGraphic.png)";

  let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;
  ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccSymMidWithAll.png)";

  let couponSectionBuffer:HTMLElement = document.getElementsByClassName("couponSection")[0] as HTMLElement;
  couponSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccSymCoupon.png)";

  let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
  scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccScanline.png)";
}

function unpopulateSkeleton()
{
  for(var i =0; i <10; i++)
  {
    let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
    divChange.style.backgroundImage="";
  }
}

function addGreyScale()
{
  for(var i =0; i <10; i++)
  {
    let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
    divChange.classList.add("black_and_white");
  }
}

function removeGreyScale()
{
  for(var i =0; i <10; i++)
  {
    let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;
    divChange.classList.remove("black_and_white");
  }
}

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {
  activeCore: string;
  activeStatementType: string;
  activeColorMode: string;
  activeCClogo: string;
  activeMaskType: string;
  activeScanline: string;
  activeMarketingLevel: string;

  constructor(private viewContainerRef: ViewContainerRef) { }

  // Any call to this function gets the build-page variables
  getParentComponent(): BuildPageComponent
  {
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
  }

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

  getSurveyDataFromBuild()
  {
    this.getCore();
    this.getStatementType();
    this.getColorMode();
    this.getCClogo();
    this.getMaskType();
    this.getScanline();
    this.getMarketing();
    // future gets

    if (this.activeColorMode == "greyscale")
    {
      addGreyScale();
    }
    else
    {
      removeGreyScale();
    }
  }

  updateAlert()
  {
    try {
      let alertBuffer :HTMLElement = document.getElementsByClassName("alert-primary")[0] as HTMLElement; 
      alertBuffer.textContent="whatever";
    }
    catch {
      console.log("alertBuffer missing, alertBox missing")
    }
  }

  popSkele()
  {
    this.getSurveyDataFromBuild()
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard')
    {
      populateSymitarCC();
      this.updateAlert();
      this.changeCClogo();
      this.updateMasking();
      this.updateScanline();
      this.updateMarketing();
    }
    else
    {
      if (this.activeCore != "undefined" && this.activeStatementType != "undefined")
      {
        console.log("preview: popSkele: Assets not loaded, core and statementType mismatch")
        unpopulateSkeleton();
        alert("No assets found for selected core and statementType")
      }
    }
  }
  
  printPdf()
  {
    let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[0] as HTMLElement; 
    viewBoxBuffer.style.border= "2px solid rgba(0,0,0,0)";

    var data = document.getElementById('print');
    html2canvas(data).then(canvas =>{
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p','in','letter');
      // https://artskydj.github.io/jsPDF/docs/module-addImage.html
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 8.5, 11, "NONE")
      pdf.save('image.pdf');
    });
    //let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[0] as HTMLElement; 
    viewBoxBuffer.style.border= "2px solid rgba(0,0,0,1)";
  }

  changeCClogo()
  {
    let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
    if (this.activeCClogo == "none")
    {
      ccLogoSectionBuffer.style.backgroundImage="";
    }
    else if (this.activeCClogo == "visa")
    {
      ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccVisaLogo.png)";
    }
    else if (this.activeCClogo == "mastercard")
    {
      ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccMastercardLogo.png)";
    }
  }

  updateMasking()
  {
    let headerSectionBuffer:HTMLElement = document.getElementsByClassName("headerSection")[0] as HTMLElement;
    if (this.activeMaskType == "none")
    {
      headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccHeader.png)";
    }
    else if (this.activeMaskType == "to3")
    {
      headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccHeaderMaskTo3.png)";
    }
    else if (this.activeMaskType == "to4")
    {
      headerSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccHeaderMaskTo4.png)";
    }
  }

  updateScanline()
  {
    let scanlineSectionBuffer:HTMLElement = document.getElementsByClassName("scanlineSection")[0] as HTMLElement;
    if (this.activeScanline == "yes")
    {
      scanlineSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccScanline.png)";
    }
    else if (this.activeScanline == "no")
    {
      scanlineSectionBuffer.style.backgroundImage="";
    }
  }

  updateMarketing()
  {
    let topGraphicSectionBuffer:HTMLElement = document.getElementsByClassName("topGraphicSection")[0] as HTMLElement;
    let ccMidSectionBuffer:HTMLElement = document.getElementsByClassName("ccMidSection")[0] as HTMLElement;

    if (this.activeMarketingLevel == "imageOnly")
    {
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccTopGraphic.png)";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccSymMidWithAll.png)";
    }
    else if (this.activeMarketingLevel == "contactInfo")
    {
      topGraphicSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccTopContactInfo.png)";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccSymMidWithoutContactInfo.png)";
    }
    else if (this.activeMarketingLevel == "none")
    {
      topGraphicSectionBuffer.style.backgroundImage="";
      ccMidSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccSymMidWithAll.png)";
    }
  }

  ngOnInit()
  {

  }

}