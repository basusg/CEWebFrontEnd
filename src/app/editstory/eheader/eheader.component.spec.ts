import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EheaderComponent } from './eheader.component';

describe('EheaderComponent', () => {
  let component: EheaderComponent;
  let fixture: ComponentFixture<EheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
