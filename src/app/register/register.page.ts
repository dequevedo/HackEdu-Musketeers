import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Md5Service } from '../md5.service';
import { FirebaseService } from '../firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  matricula: any = 459104;
  alunoTemp: any = undefined;
  aluno: any = undefined;

  //variaveis para controle de formulário
  formSenha: string = "";
  formReSenha: string = "";
  formNascimento: string = "";
  formResponse: string = "";
  formEmail: string = "";
  hashSenha: any;


  conta: any = {
    pass: "",
    matricula: undefined
  };

  usuarioAluno: any = {
    matricula: undefined,
    type: "Aluno",
    attributes: {
      leit_pont: 0
    }
  }


  constructor(private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private loadingController: LoadingController,
    private md5: Md5Service,
    private router: Router
  ) { }

  ngOnInit() {
  }




  async findMatricula() {
    //essa função deve verificar se a matricula digitada:
    // 1) se já esta cadastrada no firebase (contas), se não estiver, prossegue
    // 2) verificar se existe esse número de matrica na API da IMA
    // 3) precisamos criar um meio de validar que é realmente a pessoa que esta cadastrando
    // 4) estando tudo certo, criar uma nova conta na DB do firebase, utilizando os dados pegos com a matricula no API da IMA

    this.alunoTemp = undefined;
    this.aluno = undefined;

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
        //busca a matricula digitada na API da IMA
        this.databaseService.getAlunoFromAPI(this.matricula).then(res => {
          if (res.data[0] != undefined) {
            console.log(res);
            this.alunoTemp = res.data[0];
          } else {
            alert("n° de matrícula não encontrada no ano atual")
          }
          console.log(this.alunoTemp);
        })
      } else {
        alert("está matricula ja possui cadastro")
      }
      this.loadingController.dismiss();
    });
  }


  cadastrar() {
    var dateB: any = moment(this.formNascimento).format("YYYY-MM-DD");    
    if (dateB != this.aluno.attributes.data_nascimento) {      
      console.log(dateB + " != " + this.aluno.attributes.data_nascimento)
      this.formResponse = "Data de nascimento incorreta";
    }
    else if (this.formReSenha != this.formSenha) {
      console.log(this.formReSenha + " != " + this.formSenha)
      this.formResponse = "As senhas não coincidem";
    }
    else if (this.formSenha.length < 8) {
      this.formResponse = "A senha deve ter ao menos 8 digitos";
    }
    else if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.formEmail)) {
      this.formResponse = "Email inválido";
    }
    else {
      this.conta.matricula = this.matricula;
      this.conta.pass = this.md5.toMD5(this.formSenha).toString();

      this.usuarioAluno.matricula = this.matricula;
      this.usuarioAluno.attributes.email = this.formEmail
      this.usuarioAluno.attributes.local = this.aluno.attributes.local_cod
      this.usuarioAluno.attributes.serie = this.aluno.attributes.serie_cod
      this.usuarioAluno.attributes.turma = this.aluno.attributes.turma

      this.firebaseService.newConta(this.conta, this.usuarioAluno, this.matricula).then(resp => {
        console.log("resp of Promise.then: " + resp);
        if (resp) {
          alert("Bem vindo ao Portal SEILE!")
          this.firebaseService.setUsuario(this.matricula);
          this.router.navigate(['/home/']);
        }
      });
    }
  }

  goToRegisterProf() {
    this.router.navigate(['/register-prof/']);
  }

}
