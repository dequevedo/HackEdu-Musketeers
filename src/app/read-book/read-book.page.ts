import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { DatabaseService } from 'src/app/database.service';

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
    private databaseService: DatabaseService
    ) {}

  ngOnInit() {
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
