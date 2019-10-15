import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  response: any;

  private imabaseUrl = "https://api-hackedu.campinas.sp.gov.br/v1";
  imaDBkey: string = "QnhXYwfxN1Qaz4wmBfl7jkCL1c";

  //variaveis de conta e aluno
  public conta: any = undefined;
  public aluno: any = undefined;

  //url base do firebase
  private firebaseUrl = "https://portalseile.firebaseio.com/SeileDB";


  constructor(private httpClient: HttpClient) { }

  async getConta(user: any): Promise<any> {
    const url: string = this.firebaseUrl + "/contas" + ".json";

    return new Promise((resolve) => {
      this.httpClient.get(url).subscribe(response => {
        var array = Object.values(response); //pega os objetos dentro do objeto response, e coloca em um array

        //procura o user digitado nas contas obtidas
        var conta = array.find(x => x.user == user);

        //se encontrar o user, retorna a conta, senão retorna
        if (conta != undefined && conta != null) {
          resolve(conta);
        } else {
          resolve(undefined);
        }

      });
    });
  }

  getAlunoPorMatricula(matricula: string): any {
    const url: string = this.imabaseUrl + "/alunos?filter%5Bmatricula%5D=" + matricula + "&filter%5Bano%5D=2019&apikey=" + this.imaDBkey;
    return this.httpClient.get(url);
  }

  setConta(conta: any) {
    this.conta = conta;
    this.aluno = this.getAlunoPorMatricula(conta.matricula);
  }

  async getAluno(): Promise<any> {
    return new Promise((resolve) => {
      this.aluno = this.getAlunoPorMatricula(this.conta.matricula);
      resolve(this.aluno);

    });
  }
}
