import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';
import { FirebaseService } from '../firebase.service';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { buffer } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage'

import { NavController, LoadingController } from '@ionic/angular';


//import firebase from '@angular/fire/firebase-node'
import { from } from 'rxjs';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  constructor(
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  book: any = undefined;
  data: any = {
    items: []
  };
  search: boolean = true;



  aluno: any;
  conta: any;

  // ARQUIVOS
  nomeResumo = "Selecionar Resenha/Resumo";
  name: any;
  dirPath: any;
  tipoDocF: any;

  butEnviar: any = true;
  // ---------------------

  // LEITURA
  dataInicio: any = new Date().toISOString();


  ngOnInit() {
    this.butEnviar = true;
  }

  ionViewDidEnter() {
    this.book = this.bookService.book

    this.databaseService.getAlunoFromAPI(undefined).then(res => {
      if (res.data[0] != undefined) {
        this.aluno = res.data[0];
      } else {
        alert("n° de matrícula não encontrada no ano atual")
      }
    });

    this.conta = this.firebaseService.getContaLocal();
  }



  escolherArquivo() {
    this.fileChooser.open()
      .then((uri) => {

        this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
          alert(uri)
          this.filePath.resolveNativePath(uri)
            .then((filePath) => {
              filePath;

              this.dirPath = filePath;
              let dirPathSegments = this.dirPath.split("/")
              this.name = dirPathSegments.pop()
              this.dirPath = dirPathSegments.join("/")
              let tipoDocI = this.name.split(".");
              this.tipoDocF = tipoDocI.pop(); // Tratar erro caso for diferente de jpg, pdf, docx

              this.nomeResumo = name; //Não está mostrando o nome do arquivo selecionado????
              this.butEnviar = false;

            }).catch(err => alert(JSON.stringify(err)));

        }).catch(e => alert(e));
      }).catch(e => alert(e));

  }

  enviarArquivo() {
    this.file.readAsArrayBuffer(this.dirPath, this.name).then(async (buffer) => {
      await this.firebaseService.uploadResumo(buffer, this.firebaseService.matricula
        + "/" + "nA" + "/" + (new Date().getDate()), this.tipoDocF); //nA de Não Avaliado - Arrumar o nome do arquivo

    }).catch(e => alert(JSON.stringify(e)));

    this.butEnviar = true;
  }

  enviarFirebase() {

    var leitura = {
      "aluno_local" : this.databaseService.aluno.attributes.local_cod,
      "aluno_matr" : this.firebaseService.conta.matricula,
      "dataInicio": this.dataInicio,
      "createDate": new Date().toISOString(),
      "book" : {
        "authors" : this.book.volumeInfo.authors,
        "publishedDate" : this.book.volumeInfo.publishedDate,
        "title" :  this.book.volumeInfo.title,
        "categories": this.book.volumeInfo.categories,
        "pageCount": this.book.volumeInfo.pageCount
      },
      "file" : "https://firebasestorage.googleapis.com/v0/b/portalseile.appspot.com/o/Resumos%2F5229.pdf?alt=media&token=12e551bf-82ce-47d7-8d6c-1c9d438b00ad",
      "nota" : "-",
      "prof_matr" : "-"
    }

    this.firebaseService.newLeitura(leitura).then(resp => {
      alert("Leitura enviada com sucesso! Aguarte até que ela seja avaliada.");
      this.router.navigate(['/read-book/']);
    });
  }

  cancelarEnvio() {
    // this.butEnviar = true;
    // this.butCancelar = true;
    this.nomeResumo = "Selecionar Resenha/Resumo";
    this.search = true;
    this.book = undefined;
  }


  digitEvent(cid: any) {
    if (cid.target.value != '') {
      this.data = {
        items: []
      };
      this.bookService.load(cid.target.value).then(response => {
        this.data = response;
      });
    }
  }

}
