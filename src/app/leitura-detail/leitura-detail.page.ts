import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { DatabaseService } from '../database.service';
import { FirebaseService } from '../firebase.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-leitura-detail',
  templateUrl: './leitura-detail.page.html',
  styleUrls: ['./leitura-detail.page.scss'],
})
export class LeituraDetailPage implements OnInit {

  constructor(    private bookService: BookServiceService,
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController,) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(true);


    
  }

}
