import { Component, OnInit, ElementRef, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { BuildPageComponent } from '../build-page.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

function printPdf() 
{
  let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[0] as HTMLElement; 
  viewBoxBuffer.style.border= "none";

  var data = document.getElementById('print');
  html2canvas(data).then(canvas =>{
     var imgWidth =200;
     var pageHeight =275;
     var imgHeight = canvas.height * imgWidth / canvas.width;
     var heightLeft = imgHeight;
     const contentDataURL = canvas.toDataURL('image/png')
     let pdf = new jspdf('p','mm','letter');
     var position =0;
     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
     pdf.save('image.pdf');
    });
  viewBoxBuffer.style.border= "2px soild";
}

function populateSymitarCC()
{
  let paperContainerBuffer:HTMLElement = document.getElementsByClassName("paperContainer")[0] as HTMLElement;
  paperContainerBuffer.style.border="none";

  let logoSectionBuffer:HTMLElement = document.getElementsByClassName("logoSection")[0] as HTMLElement;
  logoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/defaultLogo.png)";

  let addressSectionBuffer:HTMLElement = document.getElementsByClassName("addressSection")[0] as HTMLElement;
  addressSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/address.png)";
  
  let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
  ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccVisaLogo.png)";

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
  tempFlipCClogo: boolean; //for testing

  constructor(private viewContainerRef: ViewContainerRef) { }

  // Any call to this function gets the build-page variables
  getParentComponent(): BuildPageComponent
  {
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
  }

  getCore()
  {
    this.activeCore = this.getParentComponent().activeCore;
    console.log("preview: core: ", this.activeCore);
  }

  getStatementType()
  {
    this.activeStatementType = this.getParentComponent().activeStatementType;
    console.log("preview: statementType: ", this.activeStatementType);
  }

  getColorMode()
  {
    this.activeColorMode = this.getParentComponent().activeColorMode;
    console.log("preview: colorMode: ", this.activeColorMode);
  }

  getSurveyDataFromBuild()
  {
    this.getCore();
    this.getStatementType();
    this.getColorMode();
    if (this.activeColorMode == "greyscale")
    {
      this.addGS()
    }
    else
    {
      removeGreyScale();
    }
    // future gets
  }

  popSkele()
  {
    this.getSurveyDataFromBuild()
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard')
    {
      populateSymitarCC();
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

  addGS()
  {
    addGreyScale();
  }
  
  printPdf()
  {
    printPdf();
  }

  changeCClogo()
  {
    let ccLogoSectionBuffer:HTMLElement = document.getElementsByClassName("ccLogoSection")[0] as HTMLElement;
    if (this.tempFlipCClogo == false)
    {
      ccLogoSectionBuffer.style.backgroundImage="";
      this.tempFlipCClogo = true;
    }
    else
    {
      ccLogoSectionBuffer.style.backgroundImage="url(../../../assets/ccSymitar/ccVisaLogo.png)";
      this.tempFlipCClogo = false;
    }
    
  }

  ngOnInit()
  {
    this.tempFlipCClogo = false;
  }

}