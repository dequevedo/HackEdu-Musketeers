import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseService } from '../firebase.service';
import { LoadingController } from '@ionic/angular';
import { Md5Service } from '../md5.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.page.html',
  styleUrls: ['./register-prof.page.scss'],
})
export class RegisterProfPage implements OnInit {

  matricula: any = "905001587";
  matExists: Boolean = false;

  //variaveis para controle de formulário
  formSenha: string = "";
  formReSenha: string = "";
  formNome: string = "";
  formResponse: string = "";
  hashSenha: any;
  localArray: any[] = [];

  conta: any = {
    pass: "",
    type: "Professor",
    attributes: {
      nome: "",
      local_list: []
    },
    matricula: undefined
  };


  constructor(private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private loadingController: LoadingController,
    private md5: Md5Service,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async findMatricula() {
    this.loadingController.create({
      message: 'Um momento...',
      duration: 10000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });

    await this.firebaseService.verifyUser(this.matricula).then(response => {

      if (response == undefined) {
        this.databaseService.verifyProfessorMatricula(this.matricula).then(response => {
          var rasp: any = response;
          
          if (rasp != false) {
            rasp.data.forEach(element => {
              this.localArray.push(element.attributes.aloca_local)
              console.log(element.attributes.aloca_local)
            });

            this.matExists = true;
          } else {
            alert("Matrícula inválida.")
          }
        });
      } else {
        alert("Essa Matrícula já possui cadastro")
      }
      this.loadingController.dismiss();
    });
  }


  cadastrar() {

    if (this.formReSenha != this.formSenha) {
      console.log(this.formReSenha + " != " + this.formSenha)
      this.formResponse = "As senhas não coincidem";
    }
    else if (this.formSenha.length < 8) {
      this.formResponse = "A senha deve ter ao menos 8 digitos";
    }
    else {
      this.conta.matricula = this.matricula;
      this.conta.attributes.nome = this.formNome;
      this.conta.pass = this.md5.toMD5(this.formSenha).toString();
      this.conta.attributes.local_list = this.localArray;

      this.firebaseService.setConta(this.matricula);
      console.log("Formulário correto");
      this.firebaseService.newConta(this.conta, this.matricula);
      this.router.navigate(['/home/']);
    }
  }
}
