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
  userLogin: string = "";
  protected password: string = "";

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
      duration: 6000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });

    if(this.userLogin != undefined && this.userLogin != null){
      await this.firebaseService.verifyUser(this.userLogin).then(resp => {
        var response: any = resp
        if (response != undefined && response != null) {
          var hashPass = this.md5.toMD5(this.password).toString(); //transforma a senha digitada em hash com md5
          // console.log(hashPass + " - hpass | rpass - " + response.pass)
          if (hashPass == response.pass) {
            this.firebaseService.setUsuario(this.userLogin);
            this.erroMessage = undefined;
            this.router.navigate(['/home/']);
          } else {
            this.loadingController.dismiss();
            this.firebaseService.setUsuario(undefined);
            this.erroMessage = "login ou senha incorretos";
          }
        } else {
          this.loadingController.dismiss();
          this.firebaseService.setUsuario(undefined);
          this.erroMessage = "login ou senha incorretos";
        }
      });
    }else{
      this.loadingController.dismiss();
      this.erroMessage = "login ou senha incorretos";
    }
  }

}

