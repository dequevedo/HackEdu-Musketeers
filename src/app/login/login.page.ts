import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string = "mariavitoria";
  password: string = "mariavitoria123";

  constructor(
    private menu: MenuController, 
    private router: Router,
    private databaseService: DatabaseService
    ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }  

  register(){
    this.router.navigate(['/register/']);
  }

  async login(){
    await this.databaseService.contas.subscribe(response => {
        var array = Object.values(response); //pega os objetos dentro do objeto response, e coloca em um array
        
        //verifica login e senha (foreach parece com erro, mas funciona)
        array.forEach(element => {
          if(element.user == this.id && element.user != undefined && this.id != undefined && this.password != undefined){
            if(element.pass == this.password){
              console.log("usuário logado: "+element.user+" = "+this.id);
              this.databaseService.usuario = element;
              this.router.navigate(['/home/']);
            }
          }else{
            console.log("Usuário ou senha incorretos");
          }
        });
    });
  }

}

