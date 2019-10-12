import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  response: any;
  usuario: any;

  private imabaseUrl = "https://api-hackedu.campinas.sp.gov.br/v1";
  imaDBkey: string = "QnhXYwfxN1Qaz4wmBfl7jkCL1c";

  public aluno =
    {
      name: 'Nome Aluno DB',
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      email: 'nomedoaluno@gmail.com'
    };

  private firebaseUrl = "https://portalseile.firebaseio.com/SeileDB";


  constructor(private httpClient: HttpClient, private http: HTTP) { }

  get contas() {
    const url: string = this.firebaseUrl + "/contas" + ".json";
    return this.httpClient.get(url);
  }

  getAlunoPorMatricula(matricula: string) {

    // return this.httpClient
    // .request(
    //     "GET",
    //     "https://api-hackedu.campinas.sp.gov.br/v1/alunos?filter%5Bmatricula%5D=4444&apikey=QnhXYwfxN1Qaz4wmBfl7jkCL1c", 
    //     {
    //         responseType:"json", 
    //     });


    // const params = new HttpParams()
    //   .set('filter%5Bmatricula%5D', '"44444"')
    //   .set('apikey', "QnhXYwfxN1Qaz4wmBfl7jkCL1c");

    // return this.httpClient
    //   .request("https://api-hackedu.campinas.sp.gov.br/v1/alunos");


    

    // return this.http.get(url, {}, {
    //   'Conten-Type': 'application/json'
    // }).then(response => {
    //   console.log(response);
    // });
    
    const url: string = this.imabaseUrl+"/alunos?filter%5Bmatricula%5D="+matricula+"&apikey="+this.imaDBkey;
    return this.httpClient.get(url);
  }

  getAluno() {
    return this.aluno;
  }
}
