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
  public profLocal: any = undefined;

  constructor(private httpClient: HttpClient,
    private firebaseService: FirebaseService
  ) { }

  async getAlunoFromAPI(matricula: any): Promise<any> {

    if (matricula == undefined) {
      matricula = this.firebaseService.matricula;
    }

    const url: string = this.imabaseUrl + "/alunos?filter%5Bmatricula%5D=" + matricula + "&filter%5Bano%5D=2019&apikey=" + this.imaDBkey;

    return new Promise((resolve) => {
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


  async getLocal(id: any): Promise<any> {
    const url: string = this.imabaseUrl + "/locais/" + id + "?&apikey=" + this.imaDBkey;
    return new Promise((resolve) => {
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  async verifyProfessorMatricula(profMatricula: string) {
    const url: string = this.imabaseUrl + "/escolas_professores?filter%5Bano%5D=2019&filter%5Bmatricula%5D=" + profMatricula + "&apikey=" + this.imaDBkey;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        var resp: any = res
        if(resp.data[0].id != undefined){
          resolve(res);
        }else{
          resolve(false);
        }
      });
    });
  }

}
