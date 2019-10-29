import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfPage } from './register-prof.page';

describe('RegisterProfPage', () => {
  let component: RegisterProfPage;
  let fixture: ComponentFixture<RegisterProfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
