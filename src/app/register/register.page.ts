import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { empty } from 'rxjs';
import { LoadingController } from '@ionic/angular';

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

  constructor(private databaseService: DatabaseService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.formNascimento != this.aluno.attributes.data_nascimento){
      this.formResponse = "Data de nascimento incorreta";
      return;
    }

    if(this.formReSenha != this.formSenha){
      this.formResponse = "As senhas não coincidem";
      return;
    }

    console.log("Formulário correto");

  }

  //essa função deve verificar se a matricula digitada:
  // 1) se já esta cadastrada no firebase (contas), se não estiver, prossegue
  // 2) verificar se existe esse número de matrica na API da IMA
  // 3) precisamos criar um meio de validar que é realmente a pessoa que esta cadastrando
  // 4) estando tudo certo, criar uma nova conta na DB do firebase, utilizando os dados pegos com a matricula no API da IMA

  async findMatricula() {

    this.alunoTemp = undefined;
    this.aluno = undefined;

    this.loadingController.create({
      message: 'Um momento...',
      duration: 20000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });

    await this.databaseService.getConta(this.matricula).then(response => {
      this.loadingController.dismiss();

      if (response == undefined || response == null) {
        //busca a matricula digitada na API da IMA
        this.databaseService.getAlunoPorMatricula(this.matricula).subscribe(response => {
          this.alunoTemp = response.data[0];
          console.log(this.alunoTemp);
        })
      }
    });
  }

}
