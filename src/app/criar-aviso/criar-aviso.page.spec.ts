import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAvisoPage } from './criar-aviso.page';

describe('CriarAvisoPage', () => {
  let component: CriarAvisoPage;
  let fixture: ComponentFixture<CriarAvisoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarAvisoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
