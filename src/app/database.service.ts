import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  response: any;
  usuario: any;

  private imabaseUrl = "https://api-hackedu.campinas.sp.gov.br/v1";
  imaDBkey: string = "QnhXYwfxN1Qaz4wmBfl7jkCL1c";

  //object de aluno provisório
  public aluno =
    {
      name: 'Nome Aluno DB',
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      email: 'nomedoaluno@gmail.com'
    };

  //url base do firebase
  private firebaseUrl = "https://portalseile.firebaseio.com/SeileDB";


  constructor(private httpClient: HttpClient) { }

  get contas() {
    const url: string = this.firebaseUrl + "/contas" + ".json";
    return this.httpClient.get(url);
  }

  getAlunoPorMatricula(matricula: string) {
    const url: string = this.imabaseUrl+"/alunos?filter%5Bmatricula%5D="+matricula+"&apikey="+this.imaDBkey;
    return this.httpClient.get(url);
  }

  getAluno() {
    return this.aluno;
  }
}
