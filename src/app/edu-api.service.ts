import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EduApiService {

  private apiUrl: string = "https://api-hackedu.campinas.sp.gov.br/v1";
  apiKey: string = "QnhXYwfxN1Qaz4wmBfl7jkCL1c";


  constructor(private httpClient: HttpClient){}

  async getAlunoFromAPI(matricula: any): Promise<any> {
    const url: string = this.apiKey + "/alunos?filter%5Bmatricula%5D=" + matricula + "&filter%5Bano%5D=2019&apikey=" + this.apiKey;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }


  async getAlunoNotasFromAPI( ano : any, matricula: any): Promise<any> {
    const url: string = this.apiUrl + "/alunos_notas?apikey="+ this.apiKey + "&filter[ano]="+ ano + "&filter[matricula]="+matricula;
    return new Promise((resolve) => {
      console.log(url);
      this.httpClient.get(url).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }


}
