import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/book-service.service';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
})
export class ReadBookPage implements OnInit {

  terms: string;
  data: any = {
    items: []
  };

  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
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
