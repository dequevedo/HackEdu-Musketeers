import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  aluno: any;
  search: Boolean = false

  terms: string;

  profLocalSelected: any;

  data: any = {
    items: []
  };

  constructor(
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.firebaseService.conta.type != "Professor") {
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
    }
  }

  addLeitura() {
    this.router.navigate(['/add-book/']);
  }

  profLocalChange() {
    console.log("localChanged");
    this.firebaseService.getLeiturasAguardando(this.profLocalSelected).then(res => {
      this.firebaseService.leituras = res;
    })
  }

  leituraDetail(leitura) {
    this.firebaseService.leituraDetail = leitura;
    this.router.navigate(['/leitura-detail/']);
  }


}
