import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File} from '@ionic-native/file/ngx';
import { buffer } from 'rxjs/operators';

import {AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'


//import firebase from '@angular/fire/firebase-node'
import { from } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  constructor(    
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private fileChooser: FileChooser,
    private file: File,
    private firebase: AngularFireStorage
    ) { }

  book: any;
  aluno: any;
  conta: any;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.book = this.bookService.book

    this.databaseService.getAlunoFromAPI(this.databaseService.conta.matricula).then(res => {
      if (res.data[0] != undefined) {
        this.aluno = res.data[0];
      } else {
        alert("n° de matrícula não encontrada no ano atual")
      }
    });

    this.conta = this.databaseService.getContaLocal();
  }
  teste(){
    this.fileChooser.open()
  .then((uri)  => { alert(uri);

    this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
      alert(JSON.stringify(newUrl));

      let dirPath = newUrl.nativeURL;
      let dirPathSegments = dirPath.split("/")
      dirPathSegments.pop()
      dirPath = dirPathSegments.join("/")
      alert("oi23")
      this.file.readAsArrayBuffer(dirPath, newUrl.name).then( (buffer) => {
        alert("oi1")
         this.upload(buffer, newUrl.name);
        alert("oi")
      })
    }).catch(e => alert(e));
     

  })
  .catch(e => alert(e)); 


  }

   upload(buffer, name) {
    alert("knduiiubciujbui")
    let blob = new Blob([buffer]);

    
    
    this.firebase.ref('Resumos/' + name).put(blob).then((d) => {
      alert("Enviado!")
    }).catch(e => alert("JSON.stringify(e)"));
  }

}
