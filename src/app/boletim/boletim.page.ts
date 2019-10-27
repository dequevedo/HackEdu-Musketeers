import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MenuController } from '@ionic/angular'; 
import { FirebaseService } from '../firebase.service';

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
  materiaArray = undefined;

  //private statusCheck: any;

  constructor(
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private menu: MenuController
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.databaseService.materiaArray != undefined) {
      this.materiaArray = this.databaseService.materiaArray
    } else {
      this.materiaArray = undefined;
      this.databaseService.getNotas().then(res => {
        if (res.data[0] != undefined) {
          res.data.forEach(element => {
            if(this.materiaArray == undefined){
              this.materiaArray = [];
            }
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
          this.databaseService.materiaArray = this.materiaArray
          console.log(this.materiaArray)
        } else {
          this.materiaArray = undefined
          this.databaseService.materiaArray = this.materiaArray
          alert("Não foram encontradas notas do aluno no ano atual")
        }
      });
    }

    this.conta = this.firebaseService.getContaLocal()

    this.menu.enable(true);
  }


}
