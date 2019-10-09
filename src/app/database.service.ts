import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public aluno = 
    {
      name: 'Nome Aluno DB',
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      email: 'nomedoaluno@gmail.com'
    };

  constructor() { }

  getAluno(){
    return this.aluno;
  }
}
