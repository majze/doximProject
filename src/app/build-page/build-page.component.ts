import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { PreviewPaneComponent } from './preview-pane/preview-pane.component';

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.css']
})
export class BuildPageComponent implements OnInit {
  lastChange: string;
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

  @ViewChild(PreviewPaneComponent) child: PreviewPaneComponent;
  
  constructor() {}

  // Reading events emitted by survey-child component
  readSurveyEmitted(val)
  {
    var surveyFlags = val;
    console.log("build-page: combinedFlags: ", surveyFlags);
    var splitted = surveyFlags.split("|");
    this.activeCore = splitted[0];
    this.activeStatementType =  splitted[1];
    this.activeColorMode = splitted[2];
    this.activeHexCode = splitted [3];
    this.activeCClogo = splitted[4];
    this.activeCustomerlogo = splitted[5];
    this.activeMaskType = splitted[6];
    this.activeScanline = splitted[7];
    this.activeMarketingLevel = splitted[8];

    this.activeOnsert = splitted[9];
    this.activeNewsflash = splitted[10];
    this.activeGlance = splitted[11];
    this.activeAccSum = splitted[12];
    this.activeTransactionsMode =  splitted[13];
    this.activeWhitespaceMode = splitted[14];
    this.activeJointOwners = splitted[15];
    this.activeTYDMode = splitted[16];
    this.activeRewardsType = splitted[17];
    this.activeOutboundEnvelope = splitted[18];
    this.activeReplyEnvelope = splitted[19];
    this.writeSurveyToPreview();
  }

  // Reads whenever there is an update in the survey input and records that last change
  readSurveyChange(val)
  {
    this.lastChange = val;
    console.log("build: Received update from: " + this.lastChange);
  }

  // Sending survey flag updates to preview pane and repopulating the skeleton
  writeSurveyToPreview()
  {
    this.child.populateSkeleton();
  }

  ngOnInit() {}

}
