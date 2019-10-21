import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.page.html',
  styleUrls: ['./boletim.page.scss'],
})
export class BoletimPage implements OnInit {

  segmentButtonClicked(ev: any) {
    console.log('Segment button clicked', this.statusCheck);
  }

  public aluno: any;

  private notas: {};

  private statusCheck: any;
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
  
  }

  ionViewDidEnter() {
    this.databaseService.getNotas(this.databaseService.conta.matricula).then(res => {
      if (res.data[0] != undefined) {
        this.notas = res.data
        console.log(res.data);
      } else {
        alert("n° de matrícula não encontrada no ano atual")
      }
    });
  }  

}
