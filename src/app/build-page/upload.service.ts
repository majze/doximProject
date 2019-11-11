import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
// import { SurveyPaneComponent } from './survey-pane/survey-pane.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  firebaseStorageURL: string;

  constructor(private storage: AngularFireStorage //,
    //public surveyPaneComponent: SurveyPaneComponent
    ) { }

  saveCustomerLogoToFirebaseStorage(image: any, imageURL: string) {
        var filePath = `Customerlogo/${image.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, image).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log("URL: " + url)
              imageURL = url;
              this.firebaseStorageURL = url;
            })
          })
        ).subscribe();
  }

}

//old onSubmit() code
    // //  var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    // var filePath = `Customerlogo/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    // const fileRef = this.storage.ref(filePath);
    // this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((url) => {
    //       formValue['imageUrl'] = url;
    //       console.log("URL: " + url)
    //       // Update preview pane
    //       this.activeCustomerlogo = url;
    //     //  this.activeCustomerlogo = this.selectedImage
    //       this.outputSurveyChange.emit("activeCustomerlogo");
    //       this.emitSurveyFlags();
    //     //  this.service.insertImageDetails(formValue);
    //     //  this.resetForm();
    //     })
    //   })
    // ).subscribe();