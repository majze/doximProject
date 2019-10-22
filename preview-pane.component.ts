import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-pane',
  templateUrl: './preview-pane.component.html',
  styleUrls: ['./preview-pane.component.css']
})
export class PreviewPaneComponent {

 public captureScreen()
 {
   var data = document.getElementById('a');
   html2canvas(data).then(canvas =>{

    var imgWidth =200;
    var pageHeight =295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p','mm','a4');
    var position =0;
    pdf.addImage(contentDataURL, 'PNG', 0, position,imgWidth, imgHeight)
    pdf.save('PDF.pdf');
    
   });
   
 }

}
