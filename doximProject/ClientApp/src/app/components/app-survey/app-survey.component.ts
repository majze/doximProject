import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './app-survey.component.html',
  styleUrls: ['./app-survey.component.css']
})

export class AppSurveyComponent implements OnInit {
    messageForm: FormGroup;
    submitted = false;

    constructor(private router: Router) { }

    onSubmit() {
        this.submitted = true;

        if (this.messageForm.invalid) {
            return;
        }

        this.router.navigate[("./preview")];
    }

  ngOnInit() {
  }

}
