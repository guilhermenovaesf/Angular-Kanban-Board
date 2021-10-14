import { FuncoesService } from './../../service/funcoes.service';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogElementsExampleDialog } from './../dialog-card/dialog-card.component';
import { TarefaModule } from './../../models/tarefa/tarefa.module';
import { Component, Inject, Input, Output, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogActionsComponent } from '../dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [FuncoesService],
})
export class CategoriasComponent {
  todo: TarefaModule[] = [];
  done: TarefaModule[] = [];

  cardsComponent: TarefaModule[] = [];

  constructor(public dialog: MatDialog, public cardsService: FuncoesService) {
    this.cardsService.getListaTarefas().subscribe((data: TarefaModule[]) => {
      this.cardsComponent = data;
    });
  }

  openDialogHelper(cards: object): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '450px',
      data: !cards
        ? {
            titulo: '',
            pessoa: '',
            conteudo: '',
            prazo: '',
          }
        : cards,
    });
  }

  openDialog(cards: object): void {
    this.openDialogHelper(cards);
  }

  openDialogAct(cards: TarefaModule | null): void {
    const dialogRef = this.dialog.open(DialogActionsComponent, {
      width: '250px',
      data: !cards
        ? {
            titulo: '',
            pessoa: '',
            conteudo: '',
            prazo: '',
          }
        : {
            id: cards.id,
            titulo: cards.titulo,
            pessoa: cards.pessoa,
            conteudo: cards.conteudo,
            prazo: cards.prazo,
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result.id) {
          this.cardsService
            .atualizaTarefa(result)
            .subscribe((data: TarefaModule) => {
              const index = this.cardsComponent.findIndex(
                (p) => p.id == data.id
              );
              this.cardsComponent[index] = data;
              this.cardsService
                .getListaTarefas()
                .subscribe((data: TarefaModule[]) => {
                  this.cardsComponent = data;
                });
            });

        } else {
          this.cardsService.addTarefas(result).subscribe(() => {
            this.cardsService
              .getListaTarefas()
              .subscribe((data: TarefaModule[]) => {
                this.cardsComponent = data; //rest spread cardsComponent= {...data}
              });
          });
        }
      }
    });
  }

  editCard(cards: TarefaModule) {
    this.openDialogAct(cards);
  }

  deleteCard(cards: number): void {
    this.cardsService.deletaTarefa(cards).subscribe(() => {
      this.cardsComponent = this.cardsComponent.filter((p) => p.id !== cards);
      this.todo = this.todo.filter((p) => p.id !== cards);
      this.done = this.done.filter((p) => p.id !== cards);
    });
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) { //if para quando eu movo meu card mas coloco no mesmo lugar
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    } else { //else para quando o card muda de categoria
      transferArrayItem(
        event.previousContainer.data,//retorna os cards que ficaram no lugar onde o card que eu movi saiu
        event.container.data, //pega qual elemento eu estou mudando de categoria, mas em uma lista, pega mais de um
        event.previousIndex, //toda mudança de card, me retorna a posição na lista onde esse card estava(ex:se ele estava abaixo de um card, me retona 1)
        event.currentIndex  //toda mudança de card, me retorna a posição na lista onde esse card foi parar(ex:se coloco abaixo de um card, me retona 1)
      );
console.log(event.previousContainer.id)// id da categoria que meu card sai
console.log(event.container.id) //pega o id da categoria em que meu card é mandado

    }
    let data = event.container.data[0];//pega o card que eu tô mudando, todas as informações
    data.done = !data.done;
    this.cardsService.atualizaTarefa(data)
    .subscribe(res => {
    })
}



}
