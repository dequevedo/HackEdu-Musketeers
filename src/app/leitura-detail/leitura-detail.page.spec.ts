import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeituraDetailPage } from './leitura-detail.page';

describe('LeituraDetailPage', () => {
  let component: LeituraDetailPage;
  let fixture: ComponentFixture<LeituraDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeituraDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeituraDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
