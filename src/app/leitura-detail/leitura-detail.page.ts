import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';
import { FirebaseService } from '../firebase.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-leitura-detail',
  templateUrl: './leitura-detail.page.html',
  styleUrls: ['./leitura-detail.page.scss'],
})
export class LeituraDetailPage implements OnInit {

  constructor(    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController,) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    if(this.firebaseService.conta.type != "Professor"){
      this.menu.enable(true);
      this.databaseService.getAlunoFromAPI(undefined).then(res => {
        if (res.data[0] != undefined) {
          this.aluno = res.data[0];
        } else {
          alert("Aluno não encontrado no ano atual")
        }
      });
      //pega as leituras do aluno
      this.firebaseService.getAlunoLeituras().then(res => {
        this.firebaseService.leituras = res;
      })
      this.firebaseService.getAlunoLeiturasCorrigidas().then(res => {
        this.firebaseService.alunoLeiturasCorrigidas = res;
      })
    }else{
      this.firebaseService.getLeiturasAguardando().then(res => {
        this.firebaseService.leituras = res;
      })
    }

    
  }

}
