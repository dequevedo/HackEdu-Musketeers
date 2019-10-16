import { Component, OnInit } from '@angular/core';
import { EduApiService } from '../edu-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  constructor(private eduApi : EduApiService , private loadingController : LoadingController) { }

  ngOnInit() {
    this.loadingController.create({
      message: 'Um momento...',
      duration: 10000
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
      });
    });
    this.eduApi.getAlunoNotasFromAPI("2019","460408").then(response => {
      this.loadingController.dismiss();
    });

  }

}
