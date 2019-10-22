import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  aluno: any;
  conta: any

  terms: string;

  data: any = {
    items: []
  };

  constructor(
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private menu: MenuController
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.databaseService.getAlunoFromAPI(this.databaseService.conta.matricula).then(res => {
      if (res.data[0] != undefined) {
        this.aluno = res.data[0];
      } else {
        alert("n° de matrícula não encontrada no ano atual")
      }
    });

    this.conta = this.databaseService.getContaLocal();
  }

  digitEvent(cid: any) {
    if (cid.target.value != '') {
      this.data = {
        items: []
      };
      this.bookService.load(cid.target.value).then(response => {
        this.data = response;
      });
    }
  }

}
