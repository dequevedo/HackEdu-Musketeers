import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';  


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
    private emailComposer: EmailComposer
  ) { }

  public aluno: any;
  profLocal: any;

  avisos: any[] = [
    { icon: "alert", msg: "Não haverá aula no dia 20/10/2019" },
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



  abrirAvisos() {
    console.log("abrirAvisos");
  }

  abrirTarefas() {
    console.log("abrirTarefas");
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewDidEnter() {
    if(this.firebaseService.usuario.type != "Professor"){
      this.databaseService.getAlunoFromAPI(undefined).then(res => {
        if (res.data[0] != undefined) {
          this.aluno = res.data[0];
          this.databaseService.aluno = this.aluno
        } else {
          alert("Aluno não encontrado no ano atual")
        }
      });
    }else if(this.databaseService.profLocal == undefined){
      this.databaseService.getLocal(this.firebaseService.usuario.attributes.local_list[0]).then(res => {
        if (res.data[0] != undefined) {
          this.databaseService.profLocal = res.data[0];
        } else {
          alert("Aluno não encontrado no ano atual")
        }
      });
    }
    this.menu.enable(true);
  }





  // }
  //Só fuinciona abrindo o gmail
  enviarEmail() {
    let email = {
      to: 'iagoisborichi@gmail.com',
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Não haverá aula amanha',
      body: 'Ass: FACAMP',
      isHtml: true
    }

    this.emailComposer.open(email).then((res) => {alert("enviado: " + res)
  }).catch(e => alert(e));
  }

}
