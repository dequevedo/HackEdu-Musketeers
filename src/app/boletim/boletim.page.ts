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
    // console.log('Segment button clicked', this.materiaArray);
  }

  public aluno: any;
  public conta: any;
  materiaArray = []

  //private statusCheck: any;

  constructor(
    private databaseService: DatabaseService,
    private menu: MenuController
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.databaseService.materialArray != undefined) {
      this.materiaArray = this.databaseService.materialArray
    } else {
      this.databaseService.getNotas(this.databaseService.conta.matricula).then(res => {
        if (res.data[0] != undefined) {
          res.data.forEach(element => {
            var elem = this.materiaArray.find(x => x.materia == element.attributes.an_discipl)
            if (elem) {
              elem.notas.push(element);
            } else {
              this.materiaArray.push({
                "materia": element.attributes.an_discipl,
                "notas": [element],
                "statusCheck": ''
              });
            }
          }
          );
          this.databaseService.materialArray = this.materiaArray
          console.log(this.materiaArray)
        } else {
          alert("n° de matrícula não encontrada no ano atual")
        }
      });
    }

    this.conta = this.databaseService.getContaLocal()

    if (this.databaseService.aluno != undefined) {
      this.materiaArray = this.databaseService.materialArray
    } else {
      this.databaseService.getAlunoFromAPI(this.databaseService.conta.matricula).then(res => {
        if (res.data[0] != undefined) {
          this.aluno = res.data[0];
        } else {
          alert("n° de matrícula não encontrada no ano atual")
        }
      });
    }

    this.menu.enable(true);
  }


}
