import { FuncoesService } from './../../service/funcoes.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';
import { DialogElementsExampleDialog } from './../dialog-card/dialog-card.component';
import { TarefaModule } from './../../models/tarefa/tarefa.module';
import { ColunasModule } from './../../models/colunas/colunas.module';
import { QuadroModule } from './../../models/quadro/quadro.module';
import {Component, Inject, Input, Output, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DialogActionsComponent } from '../dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent  {

sprint = [
  {titulo:"titulo aqui",
  pessoa:"pessoa aqui",
  conteudo:"descricao aqui",
prazo:"01/10/2021"
},
{titulo:"titulo aqui1",
pessoa:"pessoa aqui1",
conteudo:"descricao aqui1",
prazo:"01/10/2021"
}

];
todo = [
  {titulo:"titulo aqui2",
  pessoa:"pessoa aqui2",
  conteudo:"descricao aqui2",
  prazo:"01/10/2021"
  },
  {titulo:"titulo aqui2.1",
  pessoa:"pessoa aqui2.1",
  conteudo:"descricao aqui2.1",
  prazo:"01/10/2021"
  }

  ];
done =[
  {titulo:"titulo aqui3",
  pessoa:"pessoa aqui3",
  conteudo:"descricao aqui3",
  prazo:"01/10/2021"
  },
  {titulo:"titulo aqui3.1",
  pessoa:"pessoa aqui3.1",
  conteudo:"descricao aqui3.1",
  prazo:"01/10/2021"
  }

  ];


  constructor(public dialog:MatDialog) {

  }



    openDialogHelper(cards:object): void {
      const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '450px',
        data:cards===null?{
          titulo:"",
          pessoa:"",
          conteudo:"",
          prazo:""
        }:cards
      });
    }

openDialog(cards:object):void{
this.openDialogHelper(cards)
}

openDialogAct(cards:object | null): void {
  const dialogRef = this.dialog.open(DialogActionsComponent, {
    width: '250px',
    data:cards===null?{
      titulo:"",
      pessoa:"",
      conteudo:"",
      prazo:""
    }:cards
  });

  dialogRef.afterClosed().subscribe(result => {

   if(result!=undefined){
    
     this.sprint.push(result);

   }
  });
}

deleteCard(cards:object):void{
 this.sprint=this.sprint.filter(p=>p!==cards)
 this.todo=this.todo.filter(p=>p!==cards)
 this.done=this.done.filter(p=>p!==cards)

}

editCard(cards:object){
  this.openDialogAct(cards)
  console.log(cards)
}


drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
}
