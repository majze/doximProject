import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-page',
  templateUrl: './build-page.component.html',
  styleUrls: ['./build-page.component.css']
})
export class BuildPageComponent implements OnInit {

  activeCore: string;
  activeStatementType: string;

  constructor() { }

  ngOnInit() {
  }

}
