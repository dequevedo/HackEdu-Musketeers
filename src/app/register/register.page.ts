import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  matricula: any;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  findMatricula(){
    //essa função deve verificar se a matricula digitada:
    // 1) se já esta cadastrada no firebase (contas), se não estiver, prossegue
    // 2) verificar se existe esse número de matrica na API da IMA
    // 3) precisamos criar um meio de validar que é realmente a pessoa que esta cadastrando
    // 4) estando tudo certo, criar uma nova conta na DB do firebase, utilizando os dados pegos com a matricula no API da IMA

    //busca a matricula digitada na API da IMA
    this.databaseService.getAlunoPorMatricula(this.matricula).subscribe(response =>{
      console.log(response.valueOf);
    })
  }

}
