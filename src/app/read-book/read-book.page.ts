import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  public aluno: any;

  terms: string;

  data: any = {
    items: []
  };

  constructor(
    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private menu: MenuController
    ) {}

  ngOnInit() {
    this.aluno = this.databaseService.getAluno();
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.aluno = this.databaseService.getAluno();
  }  

  digitEvent(cid: any) {
    if(cid.target.value != ''){
      this.data = {
        items: []
      };
      this.bookService.load(cid.target.value).then(response => {
        this.data = response;
      });
    }
  }

}
