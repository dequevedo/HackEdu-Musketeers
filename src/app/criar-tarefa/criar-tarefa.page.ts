import { Component, OnInit } from '@angular/core';

import { DatabaseService } from 'src/app/database.service';
import { FirebaseService } from '../firebase.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.page.html',
  styleUrls: ['./criar-tarefa.page.scss'],
})
export class CriarTarefaPage implements OnInit {

  constructor(
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private emailComposer: EmailComposer,
    private router: Router
  ) { }

  icon = "bookmark";
  msg = "";
  local = "";
  serie = "";
  turma = "";
  dataEntrega = "";

  ngOnInit() {
  }

  newTarefa() {
    var tarefa = {
      prof_matr: this.firebaseService.usuario.matricula,
      icon: this.icon || "information",
      msg: this.msg,
      local: this.local || this.firebaseService.usuario.attributes.local_list[0],
      serie: this.serie,
      turma: this.turma,
      key: "",
      dataEntrega: moment(this.dataEntrega).format("DD/MM/YYYY"),
      date: new Date().toISOString()
    }

    this.firebaseService.newTarefa(tarefa).then(e => {
      this.router.navigate(['/home/']);
    });
  }

}
