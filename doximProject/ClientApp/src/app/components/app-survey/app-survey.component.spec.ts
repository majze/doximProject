import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSurveyComponent } from './app-survey.component';

describe('AppSurveyComponent', () => {
  let component: AppSurveyComponent;
  let fixture: ComponentFixture<AppSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
