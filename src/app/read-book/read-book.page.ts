import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  aluno: any;
  search: Boolean = false

  terms: string;

  data: any = {
    items: []
  };

  constructor(
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if(this.firebaseService.conta.type != "Professor"){
      this.menu.enable(true);
      this.databaseService.getAlunoFromAPI(undefined).then(res => {
        if (res.data[0] != undefined) {
          this.aluno = res.data[0];
        } else {
          alert("Aluno não encontrado no ano atual")
        }
      });
    }
  }

  addLivro(livro: any){
    this.bookService.book = livro;
    this.router.navigate(['/add-book/']);
    console.log(livro); // -------------------------------------------
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
