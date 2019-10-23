import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  data: any;

  book: any

  private baseUrl = "https://www.googleapis.com/books/v1/volumes";
  private appKey = "AIzaSyCB8qzQKMirjrzE2og6ouLtQ1zal1dMkAc";
  constructor(public http: HttpClient) { }

  load(bookName: string) {

    return new Promise(resolve => {
      const url: string = this.baseUrl+"?q="+bookName+"&key="+this.appKey;    

      this.http
        .get(
          url
        )
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });

    });
  }

}

