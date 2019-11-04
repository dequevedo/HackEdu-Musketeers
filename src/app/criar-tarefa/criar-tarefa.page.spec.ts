import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTarefaPage } from './criar-tarefa.page';

describe('CriarTarefaPage', () => {
  let component: CriarTarefaPage;
  let fixture: ComponentFixture<CriarTarefaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTarefaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
