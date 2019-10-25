import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File} from '@ionic-native/file/ngx';

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
    private file: File
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
    })
  })
  .catch(e => alert(e)); 


  }

}
