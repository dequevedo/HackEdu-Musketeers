import { Component, OnInit } from '@angular/core';

import { DatabaseService } from 'src/app/database.service';
import { FirebaseService } from '../firebase.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-aviso',
  templateUrl: './criar-aviso.page.html',
  styleUrls: ['./criar-aviso.page.scss'],
})
export class CriarAvisoPage implements OnInit {

  constructor( 
    private databaseService: DatabaseService,
    private firebaseService: FirebaseService,
    private emailComposer: EmailComposer,
    private router: Router
    ) { }

    icon = "information";
    msg = "";
    local = "";
    serie = "";
    turma = "";
    dataOcorrencia="";

  ngOnInit() {
  }


  newAviso() {
    var aviso = {
      prof_matr: this.firebaseService.usuario.matricula,
      icon: this.icon || "information",
      msg: this.msg,
      local: this.local || this.firebaseService.usuario.attributes.local_list[0],
      serie: this.serie,
      turma: this.turma,
      key: "",
      dataOcorrencia: moment(this.dataOcorrencia).format("DD/MM/YYYY"),
      date: new Date().toISOString()
    }

    this.firebaseService.newAviso(aviso).then(e => {
      this.enviarEmail();      
    });
  }

   //Só funciona abrindo o gmail
   enviarEmail() {

    this.firebaseService.getUsers(this.firebaseService.usuario.attributes.local_list[0], this.serie, this.turma).then(response =>{
      var resp: any = response;
      resp = resp.map(function(user){
        return user.attributes.email;
      });
      // console.log(resp);
        let email = {
          to: resp,
          cc: '',
          bcc: [],
          attachments: [],
          subject: 'Aviso escola: ' + this.firebaseService.usuario.attributes.local_list[0],
          body: this.msg +" \t /t /n \n  "+ "/n "+ this.firebaseService.usuario.attributes.nome,
          isHtml: true
        }
    
        this.emailComposer.open(email).then((res) => {          
          this.router.navigate(['/home/']);
        }).catch(e => alert(e));

     
    });

  }

}
