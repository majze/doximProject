import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPaneComponent } from './preview-pane.component';

describe('PreviewPaneComponent', () => {
  let component: PreviewPaneComponent;
  let fixture: ComponentFixture<PreviewPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
