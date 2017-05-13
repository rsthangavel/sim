import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprofessorComponent } from './newprofessor.component';

describe('NewprofessorComponent', () => {
  let component: NewprofessorComponent;
  let fixture: ComponentFixture<NewprofessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprofessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprofessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
