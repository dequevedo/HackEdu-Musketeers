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
  //RETIRAR PRESETS QUANDO O APP ESTIVER PRONTO
  public conta: any = {
    "user": "mariavitoria",
    "pass": "mariavitoria123",
    "matricula": 459104,
    "img": "https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2017/11/09/252610-em-tempo-de-amar-maria-vitoria-vitor-650x488-1.jpg"
  };
  public aluno: any = undefined;
  public materialArray: any;

  //url base do firebase
  private firebaseUrl = "https://portalseile.firebaseio.com/SeileDB";


  constructor(private httpClient: HttpClient) { }

  getContaLocal() {
    return this.conta;
  }

  async getConta(user: any): Promise<any> {
    const url: string = this.firebaseUrl + "/contas" + ".json";

    return new Promise((resolve) => {
      this.httpClient.get(url).subscribe(response => {
        var array = Object.values(response); //pega os objetos dentro do objeto response, e coloca em um array

        //procura o user digitado nas contas obtidas
        var conta = array.find(x => x.user == user);

        //se encontrar o user, retorna a conta, senão retorna
        if (conta != undefined) {
          // console.log("conta não é undefined");
          resolve(conta);
        } else if (this.conta != undefined) {
          // console.log("this.conta não é undefined");
          resolve(this.conta);
        } else {
          // console.log("retornou undefined");
          resolve(undefined);
        }

      });
    });
  }

  async getAlunoFromAPI(matricula: any): Promise<any> {
    const url: string = this.imabaseUrl + "/alunos?filter%5Bmatricula%5D=" + matricula + "&filter%5Bano%5D=2019&apikey=" + this.imaDBkey;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }


  async getNotas(matricula: any): Promise<any> {
    const url: string = this.imabaseUrl + "/alunos_notas?filter%5Bano%5D=2019&filter%5Bmatricula%5D=" + matricula + "&apikey=" + this.imaDBkey;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  setConta(conta: any) {
    this.conta = conta;
  }

  getAluno() {
    return this.aluno;
  }
}
