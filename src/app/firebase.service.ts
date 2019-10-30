import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireStorage } from '@angular/fire/storage'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx'
import { Downloader } from '@ionic-native/downloader/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


import { NavController, LoadingController } from '@ionic/angular';


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
    private downloader: Downloader
  ) { }




  matricula: "459102";
  conta: any;

  //COMO USAR QUERY NO ANGULARFIREDATABASE
  // this.db.list('/items', ref => ref.orderByChild('size').equalTo('large')) 

  verifyUser(user: any) {
    return new Promise((resolve) => {
      this.db.object("SeileDB/contas/" + user).valueChanges().subscribe(response => {
        console.log("verify: "+resp);
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

  newConta(conta: any, matricula: string) {
    console.log("new conta: " + matricula);
    const url = "SeileDB/contas/" + matricula
    this.db.object(url).update(conta);
  }

  getContaLocal() {
    this.conta = this.db.object("SeileDB/contas/" + this.matricula).valueChanges().subscribe(resp => {
      this.conta = resp;
      return this.conta;
    });
  }


  setConta(user: string) {
    this.db.object("SeileDB/contas/" + user).valueChanges().subscribe(resp => {
      this.conta = resp;
      console.log("this.conta: "+this.conta);
      this.matricula = this.conta.matricula
    });
  }


  async uploadResumo(buffer, name, tipoDocF) {
    let blob = new Blob([buffer]);
    const loading = await this.loadingController.create({
      message: 'Enviando..'
    });
    await loading.present();

    this.firebase.ref('Resumos/' + name + '.' + tipoDocF).put(blob).then((d) => {
      loading.dismiss();
      alert("Enviado!")
    }).catch(e => alert(JSON.stringify(e)));

  }



  async downloadArquivo() {

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    const loading = await this.loadingController.create({
      message: 'Baixando..'
    });
    await loading.present();

    this.firebase.ref('Resumos/459102/nA/1572225922444.pdf').getDownloadURL().toPromise().then((en) => {


      var request = {
        uri: en,
        title: 'Test',
        description: '',
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: 1,
        destinationInExternalPublicDir: {
          dirType: '/Resumos/', //Arrumar
          subPath: '1572225922444.pdf'
        },
        //destinationUri: '/storage/emulated/0/Resumos/1572225922444.pdf'
      };
      


      this.downloader.download(request)
        .then((location: string) => {
          alert('Baixado' + location)
          loading.dismiss();
        }).catch((error: any) => alert(JSON.stringify(error)));


    }).catch(e => alert(e));

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
