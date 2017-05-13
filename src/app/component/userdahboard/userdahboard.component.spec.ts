import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdahboardComponent } from './userdahboard.component';

describe('UserdahboardComponent', () => {
  let component: UserdahboardComponent;
  let fixture: ComponentFixture<UserdahboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdahboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
