import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBookPage } from './read-book.page';

describe('ReadBookPage', () => {
  let component: ReadBookPage;
  let fixture: ComponentFixture<ReadBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
