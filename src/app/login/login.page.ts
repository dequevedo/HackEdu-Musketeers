import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Md5Service } from '../md5.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = "459102";
  protected password: string = "testinho";

  erroMessage: string = undefined;

  constructor(
    private menu: MenuController,
    private router: Router,
    private loadingController: LoadingController,
    private firebaseService: FirebaseService,
    private md5: Md5Service
  ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  register() {
    this.router.navigate(['/register/']);
  } 

  async login() {
    this.loadingController.create({
      message: 'Um momento...',
      duration: 10000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.router.navigate(['/home/']);
      });
    });

    await this.firebaseService.verifyUser(this.user).then(resp => {
      var response: any = resp
      
      if(response!= undefined && response != null){
        var hashPass = this.md5.toMD5(this.password).toString(); //transforma a senha digitada em hash com md5

        if (hashPass == response.pass) {
          this.firebaseService.setConta(this.user);
          this.erroMessage = undefined;
          console.log("dismissing loadingController...")
          this.loadingController.dismiss();
        }else{
          this.firebaseService.setConta(undefined);
          this.erroMessage = "login ou senha incorretos";
        }
      }else{
        this.firebaseService.setConta(undefined);
        this.erroMessage = "login ou senha incorretos";
      }
    });
  }

}

