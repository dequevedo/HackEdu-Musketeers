import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public aluno: any;

  avisos: any[] = [
    {icon: "alert", msg: "Não haverá aula no dia 20/10/2019"},
    {icon: "information", msg: "No dia 27/11/2019 haverá reunião de pais"}, 
    {icon: "information", msg: "No dia 30/11/2019 haverá exposição de projetos de ciência"}, 
    {icon: "information", msg: "No dia 02/12/2019 será o ultimo dia de aula"}
  ];

  tarefas: any[] = [
    {icon: "at", msg: "Pesquisar sobre o Brasil na era colonial para o dia 11/11/2019"}, 
    {icon: "book", msg: "Ler o livro 'O pequeno Principe' para o dia 20/11/2019"},
    {icon: "at", msg: "Pesquisar sobre o Biologia Marítima para apresentação no dia 21/11/2019"}, 
    {icon: "brush", msg: "Desenhar um personagem característico do folclore brasileiro para o aida 22/11/2019"}
  ];

  constructor(
    private databaseService: DatabaseService
    ) {}

  abrirAvisos(){
    console.log("abrirAvisos");
  }

  abrirTarefas(){
    console.log("abrirTarefas");
  }

  ngOnInit() {
    this.aluno = this.databaseService.getAluno();
  }
}
