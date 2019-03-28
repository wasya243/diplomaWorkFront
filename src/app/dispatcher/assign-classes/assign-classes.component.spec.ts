import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClassesComponent } from './assign-classes.component';

describe('AssignClassesComponent', () => {
  let component: AssignClassesComponent;
  let fixture: ComponentFixture<AssignClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
