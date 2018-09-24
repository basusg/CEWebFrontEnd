import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstoryComponent } from './editstory.component';

describe('EditstoryComponent', () => {
  let component: EditstoryComponent;
  let fixture: ComponentFixture<EditstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
