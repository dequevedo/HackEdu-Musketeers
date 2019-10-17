import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapituraAldioPage } from './capitura-aldio.page';

describe('CapituraAldioPage', () => {
  let component: CapituraAldioPage;
  let fixture: ComponentFixture<CapituraAldioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapituraAldioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapituraAldioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
