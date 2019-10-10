import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.page.html',
  styleUrls: ['./boletim.page.scss'],
})
export class BoletimPage implements OnInit {

  public aluno: any;

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private databaseService: DatabaseService,
    private menu: MenuController
    ) 
    {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
    this.aluno = this.databaseService.getAluno();
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    this.aluno = this.databaseService.getAluno();
  }  

}
