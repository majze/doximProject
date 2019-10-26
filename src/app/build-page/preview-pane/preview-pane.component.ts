import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

function printPdf() 
{
  // jsfiddle stuff here
  var data = document.getElementById('print');
  let viewBoxBuffer :HTMLElement = document.getElementsByClassName("viewBox")[0] as HTMLElement; 
  viewBoxBuffer.style.border= "none";
    html2canvas(data).then(canvas =>{
     var imgWidth =210;
     var pageHeight =280;
     var imgHeight = canvas.height * imgWidth / canvas.width;
     var heightLeft = imgHeight;
     const contentDataURL = canvas.toDataURL('image/png')
     let pdf = new jspdf('p','mm','letter-a4');
     var position = 0;
     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
     pdf.save('image.pdf');
    });
     viewBoxBuffer.style.border= "2px soild";
  }

function populateSymitarCC() {
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

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {
  activeCore: string;
  activeStatementType: string;

  constructor() { }

  popSkele(){
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard') {
      populateSymitarCC();
    }
    else
    {
      console.log("popSkele: Assets not loaded, core and statementType not loaded")
    }
  }
  
  printPdf()
  {
    printPdf();
  }

  ngOnInit() {
    // DON: This temp code will be replaced
    this.activeCore = 'symitar';
    this.activeStatementType = 'creditCard';
  }
}