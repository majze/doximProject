import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

downloadPDF()

{
  const doc = new jsPDF();
  doc.text('hello',15, 15);
  doc.save('first.pdf');
}

}
