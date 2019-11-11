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
    this.activeCClogo = splitted[3];
    this.activeCustomerlogo = splitted[4];
    this.activeMaskType = splitted[5];
    this.activeScanline = splitted[6];
    this.activeMarketingLevel = splitted[7];

    this.activeOnsert = splitted[8];
    this.activeTransactionsMode =  splitted[9];
    this.activeWhitespaceMode = splitted[10];
    this.activeJointOwners = splitted[11];
    this.activeTYDMode = splitted[12];
    this.activeRewardsType = splitted[13];
    this.activeOutboundEnvelope = splitted[14];
    this.activeReplyEnvelope = splitted[15];
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
