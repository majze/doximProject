import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.css']
})
export class BuildPageComponent implements OnInit {
  activeCore: string;
  activeStatementType: string;

  constructor() { }

  updateFlags(val: string) {
    // var surveyFlags = val;
    // var splitted = surveyFlags.split("|");
    // this.activeCore = splitted[0];
    // this.activeStatementType =  splitted[1];
    this.activeStatementType = val;
    console.log("build page says: ", this.activeStatementType);
  }

  ngOnInit() {
  }

}
