import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';


function exportPDF() {
  // jsfiddle stuff here
  console.log("Exporting PDF")
  const doc = new jsPDF();
  doc.text('hello',15, 15);
  doc.save('first.pdf');
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

function addGreyScale(){
  for(var i =0; i <9; i++){
  let divChange:HTMLElement = document.getElementsByClassName("gridSection")[i] as HTMLElement;

  divChange.classList.add("black_and_white");
  }
}

function removeGreyScale(){
  for(var i =0; i <9; i++){
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

  constructor() { }


  addGS(){
    addGreyScale();
  }

  removeGS(){
    removeGreyScale();
  }

  popSkele(){
    if (this.activeCore == 'symitar' && this.activeStatementType == 'creditCard') {
      populateSymitarCC();
    }
    else
    {
      console.log("popSkele: Assets not loaded, core and statementType not loaded")
    }
  }
  
  exportButton() {
    exportPDF();
  }

  ngOnInit() {
    // DON: This temp code will be replaced
    this.activeCore = 'symitar';
    this.activeStatementType = 'creditCard';
  }

}
