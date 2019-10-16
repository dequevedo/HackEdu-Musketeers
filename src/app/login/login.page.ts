import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Md5Service } from '../md5.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = "mariavitoria";
  protected password: string = "mariavitoria123";

  response: string = undefined;

  constructor(
    private menu: MenuController,
    private router: Router,
    private databaseService: DatabaseService,
    private loadingController: LoadingController,
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
      });
    });

    await this.databaseService.getConta(this.user).then(response => {
      this.loadingController.dismiss();
      if(response!= undefined){
        var hashPass = this.md5.toMD5(this.password).toString(); //transforma a senha digitada com md5
        if (hashPass == response.pass) {
          this.databaseService.setConta(response);
          this.response = undefined;
          this.router.navigate(['/home/']);
        }else{
          this.databaseService.setConta(undefined);
          this.response = "login ou senha incorretos";
        }
      }else{
        this.databaseService.setConta(undefined);
        this.response = "login ou senha incorretos";
      }
    });
  }

}

