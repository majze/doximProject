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
    console.log("build: combinedFlags: ", surveyFlags);
    var splitted = surveyFlags.split("|");
    this.activeCore = splitted[0];
    this.activeStatementType =  splitted[1];
    this.activeColorMode = splitted[2];
    this.activeCClogo = splitted[3];
    this.activeMaskType = splitted[4];
    this.activeScanline = splitted[5];
    this.activeMarketingLevel = splitted[6];

    this.activeOnsert = splitted[7];
    this.activeTransactionsMode =  splitted[8];
    this.activeWhitespaceMode = splitted[9];
    this.activeJointOwners = splitted[10];
    this.activeTYDMode = splitted[11];
    this.activeRewardsType = splitted[12];
    this.activeOutboundEnvelope = splitted[13];
    this.activeReplyEnvelope = splitted[14];
    this.writeSurveyToPreview();
  }

  // Reads whenever there is an update in the survey input and records that last change
  readSurveyChange(val)
  {
    this.lastChange = val;
    console.log("build: Received update from: " + this.lastChange);
  }

  // Sending updates to preview pane
  writeSurveyToPreview()
  {
    console.log("build: calling child.popSkele()");
    this.child.popSkele();
  }

  ngOnInit() {
    
  }

}
