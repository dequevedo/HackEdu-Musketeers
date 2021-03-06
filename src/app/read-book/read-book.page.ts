import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  aluno: any;

  leituraLocalRank: number;

  leituraLocalSerieRank: number;

  search: Boolean = false

  profMostrarLeituras: any = 'false';

  terms: string;

  profLocalSelected: any;

  data: any = {
    items: []
  };

  lAv: any;
  lNAv: any;
  leituraStatus = "navaliada";

  constructor(
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private loadingController: LoadingController,
    private menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.atualizaDados();
  }

  atualizaDados() {
    if (this.firebaseService.usuario.type != "Professor") {
      this.firebaseService.getIndexRanking(this.firebaseService.usuario.attributes.local, undefined, this.firebaseService.usuario.matricula).then(response => {
        var resp: any = response;
        this.leituraLocalRank = resp;
      });
      this.firebaseService.getIndexRanking(this.firebaseService.usuario.attributes.local, this.firebaseService.usuario.attributes.serie, this.firebaseService.usuario.matricula).then(response => {
        var resp: any = response;
        this.leituraLocalSerieRank = resp;
      });

      this.databaseService.getAlunoFromAPI(undefined).then(res => {
        if (res.data[0] != undefined) {
          this.aluno = res.data[0];
        } else {
          alert("Aluno não encontrado no ano atual")
        }
      });
      //pega as leituras do aluno
      this.firebaseService.getAlunoLeituras(undefined).then(res => {
        this.firebaseService.leituras = res;
        this.leiturasAeN();
      })
      this.firebaseService.getAlunoLeiturasCorrigidas(undefined).then(res => {
        this.firebaseService.alunoLeiturasCorrigidas = res;
      })
    }else{
      this.firebaseService.getProfLeituras(undefined).then(res => {
        this.firebaseService.profLeituras = res;
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

  leiturasAeN() {
    //Pega a leituras já avaliadas
    this.lAv = this.firebaseService.leituras;
    this.lAv = this.lAv.filter(leitura => leitura.nota != "-");

    //Pega a leituras não avaliadas
    this.lNAv = this.firebaseService.leituras;
    this.lNAv = this.lNAv.filter(leitura => leitura.nota == "-");
    console.log(this.lAv)

  }

  leituraDetail(leitura) {
    this.firebaseService.leituraDetail = leitura;
    this.router.navigate(['/leitura-detail/']);
  }


}
