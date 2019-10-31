import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { PreviewPaneComponent } from './preview-pane/preview-pane.component';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.css']
})
export class BuildPageComponent implements OnInit {
  combinedFlags: string;
  activeCore: string = null;
  activeStatementType: string;
  activeColorMode: string;
  activeCClogo: string;
  activeMaskType: string;
  activeScanline: string;
  activeMarketingLevel: string;
  activeOnsert: boolean;
  activeTransactionsMode: boolean;
  activeWhitespaceMode: boolean;
  activeJointOwners: boolean;
  activeTYDMode: boolean;
  activeRewardsType: string;
  activeOutboundEnvelope: string;
  activeReplyEnvelope: string;

  @ViewChild(PreviewPaneComponent) child: PreviewPaneComponent;
  
  constructor() {}

  // Reading events emitted by survey-child component
  readSurveyEmitted(val){
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
    this.writeSurveyToPreview();
  }

  // Sending updates to preview pane
  writeSurveyToPreview() {
    console.log("build: calling child.popSkele()");
    this.child.popSkele();
  }

  ngOnInit() {
    
  }

}
