import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public aluno: any;

  public appPages = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Boletim',
      url: '/boletim',
      icon: 'list'
    }
    ,
    {
      title: 'Leitura',
      url: '/read-book',
      icon: 'book'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private databaseService: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.aluno = this.databaseService.getAluno();
  }
}
