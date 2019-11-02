import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Md5Service } from '../md5.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  matricula: any = "459104";
  alunoTemp: any = undefined;
  aluno: any = undefined;

  //variaveis para controle de formulário
  formSenha: string = "";
  formReSenha: string = "";
  formNascimento: string = "";
  formResponse: string = "";
  hashSenha: any;


  conta: any = {
    pass: "",
    matricula: undefined,
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
          if(res.data[0]!=undefined){ 
            console.log(res);
            this.alunoTemp = res.data[0];
          }else{
            alert("n° de matrícula não encontrada no ano atual")
          }
          console.log(this.alunoTemp);
        })
      }else{
        alert("está matricula ja possui cadastro")
      }
      this.loadingController.dismiss();
    });
  }


  cadastrar() {
    if (this.formNascimento != this.aluno.attributes.data_nascimento) {
      console.log(this.formNascimento + " != " + this.aluno.attributes.data_nascimento)
      this.formResponse = "Data de nascimento incorreta";
    }
    else if (this.formReSenha != this.formSenha) {
      console.log(this.formReSenha + " != " + this.formSenha)
      this.formResponse = "As senhas não coincidem";
    }
    else if (this.formSenha.length < 8) {
      this.formResponse = "A senha deve ter ao menos 8 digitos";
    }
    else {
      this.conta.matricula = this.aluno.attributes.matricula;
      this.conta.pass = this.md5.toMD5(this.formSenha).toString();

      this.firebaseService.setConta(this.matricula);
      console.log("Formulário correto");
      this.firebaseService.newConta(this.conta, this.matricula);
      this.router.navigate(['/home/']);
    }
  }

  goToRegisterProf(){
    this.router.navigate(['/register-prof/']);
  }

}
