import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPagesAluno = [
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

  public appPagesProf = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
    }
    // ,
    // {
    //   title: 'Boletim',
    //   url: '/boletim',
    //   icon: 'list'
    // }
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
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private router: Router
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
  }

  desconectar() {
    this.firebaseService.usuario = undefined;
    this.firebaseService.matricula = undefined;
    this.firebaseService.avisos = undefined;
    this.firebaseService.avisosProf = undefined;
    this.firebaseService.alunoLeiturasCorrigidas = undefined;
    this.firebaseService.leituras = undefined;
    this.firebaseService.leituraDetail = undefined;

    this.databaseService.aluno = undefined;
    this.databaseService.materiaArray = undefined;
    this.databaseService.profLocal = undefined;

    this.router.navigate(['/login/']);
  }
}
