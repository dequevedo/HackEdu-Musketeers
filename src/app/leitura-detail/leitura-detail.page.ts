import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';
import { FirebaseService } from '../firebase.service';
import { MenuController } from '@ionic/angular';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-leitura-detail',
  templateUrl: './leitura-detail.page.html',
  styleUrls: ['./leitura-detail.page.scss'],
})
export class LeituraDetailPage implements OnInit {

  constructor(private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController, ) { }

  notaForm: number = 0;
  commentForm: string = "";

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  avaliarLeitura() {
    //cria nova leitura
    this.firebaseService.leituraDetail.prof_matr = this.firebaseService.usuario.matricula
    this.firebaseService.leituraDetail.nota = this.notaForm
    this.firebaseService.leituraDetail.comment = this.commentForm

    this.firebaseService.avaliarLeitura(this.firebaseService.leituraDetail);
  }

}
