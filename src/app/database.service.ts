import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  response: any;
  usuario: any;

  public aluno = 
    {
      name: 'Nome Aluno DB',
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      email: 'nomedoaluno@gmail.com'
    };

  private baseUrl = "https://portalseile.firebaseio.com/SeileDB";

  constructor(private httpClient: HttpClient) { }

  get contas() {
    const url: string = this.baseUrl+"/contas"+".json";   
    return this.httpClient.get(url);
  }

  getAluno(){
    return this.aluno;
  }
}
