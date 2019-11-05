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

  notaForm: Number = 0.0;
  commentForm: string = "";

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  avaliarLeitura() {
    //cria nova leitura
    this.firebaseService.leituraDetail.prof_matr = this.firebaseService.usuario.matricula
    this.firebaseService.leituraDetail.nota = Number(this.notaForm).toFixed(1);
    this.firebaseService.leituraDetail.comment = this.commentForm

    console.log(JSON.stringify(this.firebaseService.leituraDetail))
    this.firebaseService.avaliarLeitura(this.firebaseService.leituraDetail).then(resp =>{
      alert("Sua Avaliação foi enviada.")
    });
  }

  downloadArquivoLeitura(){
    var URL: any =this.firebaseService.leituraDetail.fileUrl;
    var nameArquivo: any = this.firebaseService.leituraDetail.fileName;
    var nameA: any = this.firebaseService.usuario.attributes.nome;

    this.firebaseService.downloadArquivo(nameArquivo, URL, nameA);
    
  }

}
