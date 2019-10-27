import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './firebase.service';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private imabaseUrl = "https://api-hackedu.campinas.sp.gov.br/v1";
  imaDBkey: string = "QnhXYwfxN1Qaz4wmBfl7jkCL1c";

  public aluno: any = undefined;
  public materiaArray = undefined;

  constructor(private httpClient: HttpClient,
    private firebaseService: FirebaseService
    ) { }

  async getAlunoFromAPI(matricula: any): Promise<any> {

    if(matricula == undefined){
      matricula = this.firebaseService.matricula;
    }

    const url: string = this.imabaseUrl + "/alunos?filter%5Bmatricula%5D=" + matricula + "&filter%5Bano%5D=2019&apikey=" + this.imaDBkey;

    console.log("getting aluno from: "+this.firebaseService.matricula)
    
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  async getNotas(): Promise<any> {
    const url: string = this.imabaseUrl + "/alunos_notas?filter%5Bano%5D=2019&filter%5Bmatricula%5D=" + this.firebaseService.matricula + "&apikey=" + this.imaDBkey;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  getAluno() {
    return this.aluno;
  }

}
