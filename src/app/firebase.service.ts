import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireStorage } from '@angular/fire/storage'
import { FileTransfer } from '@ionic-native/file-transfer/ngx'
import { Downloader } from '@ionic-native/downloader/ngx'

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';





@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase,
    private firebase: AngularFireStorage,
    private transfer: FileTransfer,
    private loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    private downloader: Downloader,
    private router: Router
  ) { }




  matricula: 905001587;
  usuario: any;

  avisos: any;
  avisosProf: any;

  tarefas: any;
  tarefasProf: any;

  alunoLeiturasCorrigidas: any;

  leituras: any;

  leituraDetail: any;




  getLeiturasAguardando(local: any) {
    return new Promise((resolve) => {
      this.db.list("SeileDB/leituras", ref => ref.orderByChild('prof_matr').equalTo("-")).valueChanges().subscribe(response => {
        var resp: any[] = response;
        var arrayFiltered = resp.filter(leitura => leitura.aluno_local == local);

        //se encontrar o leituras, retorna a leituras, senão retorna undefined
        if (arrayFiltered != undefined && arrayFiltered != null) {
          resolve(arrayFiltered);
        } else {
          resolve(undefined);
        }
      });
    });
  }


  getAlunoLeituras(matricula: any) {
    if (matricula == null && matricula == undefined) {
      matricula = this.matricula;
    }
    return new Promise((resolve) => {
      this.db.list("SeileDB/leituras", ref => ref.orderByChild('aluno_matr').equalTo(matricula)).valueChanges().subscribe(response => {
        var resp: any[] = response;

        var arraySorted = resp.sort((a, b) => (a.nota > b.nota) ? -1 : 1)

        //se encontrar o user, retorna a conta, senão retorna undefined
        if (arraySorted != undefined && arraySorted != null) {
          resolve(arraySorted);
        } else {
          resolve(undefined);
        }
      });
    });
  }


  getIndexRanking(local: any, serie: any, matricula: any) {
    return new Promise((resolve) => {

      this.db.list("SeileDB/usuarios", ref => ref.orderByChild('attributes/local').equalTo(local)).valueChanges().subscribe(response => {
        var resp: any[] = response;

        if (serie != undefined || serie != null) {
          console.log("serie: '"+serie+"'")
          resp = resp.filter(usuario => usuario.attributes.serie == serie);
        }

        var arraySorted = resp.sort((a, b) => (a.attributes.leit_pont > b.attributes.leit_pont) ? -1 : 1)
        var id = arraySorted.findIndex(x => x.matricula == matricula);
        var index = id;
        console.log("teste")
        console.log("("+arraySorted.length+""+"-"+index+")/"+arraySorted.length+" = "+((arraySorted.length-index)/arraySorted.length));
        var percent = ((arraySorted.length-index)/arraySorted.length)

        //se encontrar o user, retorna a conta, senão retorna undefined
        if (percent != undefined && percent != null && percent <= 1) {
          console.log(percent);
          resolve(percent);
        } else {
          resolve(undefined);
        }
      });
    });

  }

  avaliarLeitura(leitura: any) {
    const url = "SeileDB/leituras/" + leitura.key
    return new Promise((resolve) => {
      this.db.object(url).update(leitura).then(response => {
        var resp: any = response;

        this.somarAlunoLeiturasCorrigidas(leitura.aluno_matr);
        resolve(resp);
      }
      );
    })
  }

  somarAlunoLeiturasCorrigidas(matricula: any) {
    return new Promise((resolve) => {
      this.getAlunoLeiturasCorrigidas(matricula).then(response => {
        var resp: any = response;
        var array: any[] = resp;

        var leit_pont = array.reduce(function (prev, cur) {
          return prev + cur.nota;
        }, 0);


        this.db.object("SeileDB/usuarios/" + matricula).valueChanges().subscribe(response => {
          var resp: any = response;

          resp.attributes.leit_pont = leit_pont;
          this.db.object("SeileDB/usuarios/" + matricula).update(response).then(resp => {

            resolve(true);
          });
        });
      }
      )
    });
  }


  getAvisos(local: any, serie: any, turma: any) {
    return new Promise((resolve) => {
      this.db.list("SeileDB/avisos/", ref => ref.orderByChild('local').equalTo(local)).valueChanges().subscribe(response => {
        var resp: any[] = response;

        resp = resp.filter(aviso => aviso.serie == "" || aviso.serie == serie);

        resp = resp.filter(aviso => aviso.turma == "" || aviso.turma == turma);

        resolve(resp);
      });
    });
  }

  getTarefas(local: any, serie: any, turma: any) {
    return new Promise((resolve) => {
      this.db.list("SeileDB/tarefas/", ref => ref.orderByChild('local').equalTo(local)).valueChanges().subscribe(response => {
        var resp: any[] = response;

        resp = resp.filter(tarefa => tarefa.serie == "" || tarefa.serie == serie);

        resp = resp.filter(tarefa => tarefa.turma == "" || tarefa.turma == turma);
        
        resolve(resp);
      });
    });
  }

  getUsers(local: any, serie: any, turma: any) {
    return new Promise((resolve) => {
      this.db.list("SeileDB/usuarios/", ref => ref.orderByChild('attributes/local').equalTo(local)).valueChanges().subscribe(response => {
        var resp: any[] = response;
        console.log("resp getAvisos: "+JSON.stringify(resp));
        resp = resp.filter(usuario => usuario.type == "Aluno");
        console.log("resp getAvisssos: "+JSON.stringify(resp));
        if(serie != undefined && serie != null && serie != ""){
          resp = resp.filter(usuario => usuario.serie == serie);
          if(turma != undefined && turma != null && turma != ""){
            resp = resp.filter(usuario => usuario.turma == turma);
          }

        }  
        console.log("resp getAvisssodddds: "+JSON.stringify(resp));     
        
        resolve(resp);
      });
    });
  }


  getAvisosProf(prof_matr: any){
    return new Promise((resolve) => {
      this.db.list("SeileDB/avisos/", ref => ref.orderByChild('prof_matr').equalTo(prof_matr)).valueChanges().subscribe(response => {
        var resp: any = response;

         resolve(resp);
      });
    });
  } 

  getTarefasProf(prof_matr: any){
    return new Promise((resolve) => {
      this.db.list("SeileDB/tarefas/", ref => ref.orderByChild('prof_matr').equalTo(prof_matr)).valueChanges().subscribe(response => {
        var resp: any = response;

         resolve(resp);
      });
    });
  }

  getAlunoLeiturasCorrigidas(matricula: any) {
    if (matricula == null && matricula == undefined) {
      matricula = this.matricula;
    }
    return new Promise((resolve) => {

      this.db.list("SeileDB/leituras", ref => ref.orderByChild('aluno_matr').equalTo(matricula)).valueChanges().subscribe(response => {
        var resp: any[] = response;

        var arrayFiltered = resp.filter(leitura => leitura.prof_matr != "-");

        //se encontrar o user, retorna a conta, senão retorna undefined

        if (arrayFiltered != undefined && arrayFiltered != null) {
          resolve(arrayFiltered);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  verifyUser(user: any) {
    return new Promise((resolve) => {
      this.db.object("SeileDB/contas/" + user).valueChanges().subscribe(response => {

        //se encontrar o user, retorna a conta, senão retorna undefined
        var resp: any = response;
        if (resp != undefined && resp != null) {
          resolve(resp);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  newConta(conta: any, usuario: any, matricula: string) {
    return new Promise((resolve) => {
      const urlConta = "SeileDB/contas/" + matricula
      this.db.object(urlConta).update(conta).then(response => {
        var resp: any = response;

        const urlUsuario = "SeileDB/usuarios/" + matricula
        this.db.object(urlUsuario).update(usuario).then(response2 => {
          var resp2: any = response2;

          resolve(true);
        });
      });
    });
  }


  async newAviso(aviso:any) {
    const loading = await this.loadingController.create({
      message: 'Criando aviso..'
    });
    await loading.present();

    return new Promise((resolve) => {
      const url = "SeileDB/avisos/"
      this.db.list(url).push(aviso).then(response => {
        var resp: any = response;
        aviso.key = resp.key;
        const url = "SeileDB/avisos/" + aviso.key
        this.db.object(url).update(aviso).then(response2 => {
          var resp2: any = response2;
          resolve(resp2);
          loading.dismiss();
          alert("Aviso criado")
        });
      });
    });
  }

  async newTarefa(tarefa:any) {
    const loading = await this.loadingController.create({
      message: 'Criando aviso..'
    });
    await loading.present();

    return new Promise((resolve) => {
      const url = "SeileDB/tarefas/"
      this.db.list(url).push(tarefa).then(response => {
        var resp: any = response;
        tarefa.key = resp.key;
        const url = "SeileDB/tarefas/" + tarefa.key
        this.db.object(url).update(tarefa).then(response2 => {
          var resp2: any = response2;
          resolve(resp2);
          loading.dismiss();
          alert("Tarefa criada")
        });
      });
    });
  }

  newLeitura(leitura: any) {
    const url = "SeileDB/leituras/"
    return new Promise((resolve) => {
      this.db.list(url).push(leitura).then(response => {
        var resp: any = response;
        leitura.key = resp.key;
        const url = "SeileDB/leituras/" + leitura.key
        this.db.object(url).update(leitura).then(response2 => {
          var resp2: any = response2;

          resolve(resp2);
        });
      }
      );
    })

  }

  getContaLocal() {
    this.usuario = this.db.object("SeileDB/contas/" + this.matricula).valueChanges().subscribe(resp => {
      this.usuario = resp;
      return this.usuario;
    });
  }


  setUsuario(user: string) {
    this.db.object("SeileDB/usuarios/" + user).valueChanges().subscribe(resp => {

      this.usuario = resp;

      this.matricula = this.usuario.matricula
    });
  }


  async uploadResumo(buffer, name, leitura) {
    let blob = new Blob([buffer]);
    const loading = await this.loadingController.create({
      message: 'Enviando..'
    });
    await loading.present();

    var path: any = 'Resumos/' + name;

    this.firebase.ref(path).put(blob).then((d) => {

      this.firebase.ref(path).getDownloadURL().toPromise().then((resp) => {
        leitura.fileUrl = resp;

        //TEM UM ERRO AQUI QUE DÁ DE VEZ EM QUANDO( quando o livro da api do gooble nao tem a categoria do livro)
        this.newLeitura(leitura).then(resp => {
          loading.dismiss();
          alert("Leitura enviada com sucesso! Aguarte até que ela seja avaliada.");
          this.router.navigate(['/read-book/']);

        }).catch((e) => alert(JSON.stringify(e)));

      }).catch(e => alert("Erro ao obter a URL do Arquivo: " + JSON.stringify(e)));

    }).catch(e => alert(JSON.stringify(e)));

  }

  async downloadArquivo(nameArquivo: any, fileUrl: any, nameAluno: any) {

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    const loading = await this.loadingController.create({
      message: 'Baixando..',
      duration: 5000
    });
    await loading.present();

      var request = {
        uri: fileUrl,
        title: nameArquivo,
        description: nameAluno,
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: 1,
        destinationInExternalPublicDir: {
          dirType: '/Resumos/', 
          subPath: nameArquivo
        },

      };
      this.downloader.download(request)
        .then((location: string) => {
          loading.dismiss();
          alert('O arquivo foi baixado.')          
        }).catch((error: any) => alert(JSON.stringify(error)));



    //Outra maneira de fazer Download do Arquivo:

    // const fileTransfer: FileTransferObject = this.transfer.create();
    // console.log("foi")
    // const url = 'https://firebasestorage.googleapis.com/v0/b/portalseile.appspot.com/o/Resumos%2F459102%2FnA%2F1572225480200.pdf?alt=media&token=27b58949-3dc9-4ea4-8958-83e0f550bf48';
    // fileTransfer.download(url, '/storage/emulated/0/Download/' + '1572225480200.pdf').then((entry) => {

    //   alert("Baixado: " + entry.toURL());
    // }).catch(e => alert(JSON.stringify(e)));
  }




  //   {id: "2b1c8262-862b-4e41-b123-a6a883dacb35", type: "tableless-aluno", attributes: {…}}
  // attributes:
  // ano: 2019
  // curso: "PRÉ-ESCOLA: 3 - 6 ANOS"
  // curso_cod: 2
  // data_nascimento: "2014-06-12"
  // ensino: "EDUCAÇÃO INFANTIL"
  // ensino_cod: 1
  // local: "CEI RECANTO DAS CRIANCAS"
  // local_cod: "E0391"
  // matricula: 459102
  // modalidade: "INFANTIL"
  // modalidade_cod: 3
  // nome: "DAVID FERRERAS BELLIDO"
  // nome_mae: "MIRANDA RODRIGUEZ MD"
  // regiao: "NAED NOROESTE"
  // regiao_cod: 6
  // serie: "AGRUPAMENTO III"
  // serie_cod: "AG3"
  // sistema: "SME"
  // sistema_cod: 1
  // situacao_cod: "50"
  // turma: "B"
  // __proto__: Object
  // id: "2b1c8262-862b-4e41-b123-a6a883dacb35"
  // type: "tableless-aluno"
  // __proto__: Object

}
