import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController,
    private emailComposer: EmailComposer,
    private loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  public aluno: any;
  profLocal: any;
  icon = "information";
  msg = "";
  local = "";
  serie = "";
  turma = "";


  avisos: any[] = [
    {
      prof_matr: 0,
      icon: "alert",
      msg: "Não haverá aula no dia 20/10/2019",
      local: "",
      serie: "",
      turma: "",
      key: "",
      date: new Date().toISOString()
    },
    { icon: "information", msg: "No dia 27/11/2019 haverá reunião de pais" },
    { icon: "information", msg: "No dia 30/11/2019 haverá exposição de projetos de ciência" },
    { icon: "information", msg: "No dia 02/12/2019 será o ultimo dia de aula" }
  ];

  tarefas: any[] = [
    { icon: "at", msg: "Pesquisar sobre o Brasil na era colonial para o dia 11/11/2019" },
    { icon: "book", msg: "Ler o livro 'O pequeno Principe' para o dia 20/11/2019" },
    { icon: "at", msg: "Pesquisar sobre o Biologia Marítima para apresentação no dia 21/11/2019" },
    { icon: "brush", msg: "Desenhar um personagem característico do folclore brasileiro para o aida 22/11/2019" }
  ];



  async abrirAvisos(aviso) {
    var nomeProfessor;
    this.firebaseService.getProfessor(aviso.prof_matr).then(response => {
      var resp: any = response;
      nomeProfessor = resp.attributes.nome;

      var nomeLocal;
      this.databaseService.getLocalNome(aviso.local).then(async response2 => {
        var resp2: any = response2;
        nomeLocal = resp2.attributes.loc_descr;
        const alert = await this.alertController.create({
          header: "Prof.:" + nomeProfessor,
          subHeader: 'Escola: ' + nomeLocal,
          message: aviso.msg,
          buttons: ['OK']
        });
        await alert.present();
      })
    })
  }

  async abrirTarefas(tarefa) {
    var nomeProfessor;
    this.firebaseService.getProfessor(tarefa.prof_matr).then(async response => {
      var resp: any = response;
      nomeProfessor = resp.attributes.nome;

      var nomeLocal;
      this.databaseService.getLocalNome(tarefa.local).then(async response2 => {
        var resp2: any = response2;
        nomeLocal = resp2.attributes.loc_descr;
        const alert = await this.alertController.create({
          header: "Prof.:" + nomeProfessor,
          subHeader: 'Escola: ' + nomeLocal +" "+" -------------       Entrega: " + tarefa.dataEntrega,
          message: tarefa.msg,
          buttons: ['OK']
        });
        await alert.present();
      })
    });
    }

  ngOnInit() {
    }

  ionViewDidEnter() {
      this.menu.enable(true);
      this.atualizaDados()
    }

  atualizaDados() {
      if(this.firebaseService.usuario.type != "Professor") {
      this.databaseService.getAlunoFromAPI(undefined).then(res => {
        if (res.data[0] != undefined) {
          this.databaseService.aluno = res.data[0];
          this.firebaseService.getAvisos(this.firebaseService.usuario.attributes.local, this.firebaseService.usuario.attributes.serie, this.firebaseService.usuario.attributes.turma).then(response => {
            var resp: any = response;
            this.firebaseService.avisos = resp;
          });
          this.firebaseService.getTarefas(this.firebaseService.usuario.attributes.local, this.firebaseService.usuario.attributes.serie, this.firebaseService.usuario.attributes.turma).then(response => {
            var resp: any = response;
            this.firebaseService.tarefas = resp;
          });
        } else {
          alert("Aluno não encontrado no ano atual")
        }
        this.loadingController.getTop().then(resp => {
          if (resp != undefined) this.loadingController.dismiss();
        });
      });
    } else if (this.databaseService.profLocal == undefined) {
      this.databaseService.getLocal(this.firebaseService.usuario.attributes.local_list[0]).then(res => {
        if (res.data[0] != undefined) {
          this.databaseService.profLocal = res.data[0];
          this.firebaseService.getAvisosProf(this.firebaseService.usuario.matricula).then(response => {
            var resp: any = response;
            this.firebaseService.avisosProf = resp;
          });
          this.firebaseService.getTarefasProf(this.firebaseService.usuario.matricula).then(response => {
            var resp: any = response;
            this.firebaseService.tarefasProf = resp;
          });

        } else {
          alert("Professor não encontrado")
        }
        this.loadingController.getTop().then(resp => {
          if (resp != undefined) this.loadingController.dismiss();
        });
      });
    }
  }

  newAviso() {
    var aviso = {
      prof_matr: this.firebaseService.usuario.matricula,
      icon: this.icon || "information",
      msg: this.msg,
      local: this.local || this.firebaseService.usuario.attributes.local_list[0],
      serie: this.serie,
      turma: this.turma,
      key: "",
      date: new Date().toISOString()
    }

    this.firebaseService.newAviso(aviso).then(e => {
      this.enviarEmail();
    });
  }


  // }
  //Só funciona abrindo o gmail
  enviarEmail() {

    this.firebaseService.getUsers(this.firebaseService.usuario.attributes.local_list[0], this.serie, this.turma).then(response => {
      var resp: any = response;
      resp = resp.map(function (user) {
        return user.attributes.email;
      });
      console.log(resp);
      let email = {
        to: resp,
        cc: '',
        bcc: [],
        attachments: [],
        subject: 'Aviso escola: ' + this.firebaseService.usuario.attributes.local_list[0],
        body: this.msg + " \t /t /n \n  " + "/n " + this.firebaseService.usuario.attributes.nome,
        isHtml: true
      }

      this.emailComposer.open(email).then((res) => {
        alert("enviado: " + res)
        this.msg = "";
        this.serie = "";
        this.turma = "";
      }).catch(e => alert(e));


    });

  }

}
