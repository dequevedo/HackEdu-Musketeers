import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

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
    private loadingController: LoadingController
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
      duration: 20000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });

    await this.databaseService.getConta(this.user).then(response => {
      this.loadingController.dismiss();
      if(response!= undefined){
        if (response.pass == this.password) {
          this.databaseService.setConta(response);
          this.response = undefined;
          
          this.router.navigate(['/home/']);
        }else{
          this.response = "login ou senha incorretos";
        }
      }else{
        this.response = "login ou senha incorretos";
      }
    });
  }

}

