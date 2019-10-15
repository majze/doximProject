import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPaneComponent } from './survey-pane.component';

describe('SurveyPaneComponent', () => {
  let component: SurveyPaneComponent;
  let fixture: ComponentFixture<SurveyPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
