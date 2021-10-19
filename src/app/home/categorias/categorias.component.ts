import { CommonService } from './../../service/common.service';
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
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [FuncoesService],
})
export class CategoriasComponent {
  todo: TarefaModule[] = [];
  done: TarefaModule[] = [];
  sprint: TarefaModule[] = [];

  constructor(
    public dialog: MatDialog,
    public cardsService: FuncoesService,
    private commonService: CommonService
  ) {
    this.cardsService.getListaTarefas().subscribe((data: TarefaModule[]) => {
      this.listar(data);
    });

    this.commonService.txtQueryChanged
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((model) => {
        console.log(model);
        this.filterCards(model);
      });
    this.commonService.txtQueryChangedCategory
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((model) => {
        console.log(model);
        this.filterCategory(model);
      });
  }
  listar(data: TarefaModule[]) {
    for (let index = 0; index < data.length; index++) {
      data[index].show = true;
      if (data[index].status == 'sprint') {
        this.sprint.push(data[index]);
      } else if (data[index].status == 'todo') {
        this.todo.push(data[index]);
      } else if (data[index].status == 'done') {
        this.done.push(data[index]);
      }
    }
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
              const index = this.sprint.findIndex((p) => p.id == data.id);
              this.sprint[index] = data;
              this.cardsService
                .getListaTarefas()
                .subscribe((data: TarefaModule[]) => {
                  this.sprint = data;
                });
            });
        } else {
          this.cardsService.addTarefas(result).subscribe(() => {
            this.cardsService
              .getListaTarefas()
              .subscribe((data: TarefaModule[]) => {
                var array = [];
                for (let index = 0; index < data.length; index++) {
                  data[index].show = true;
                  if (data[index].status == 'sprint') {
                    array.push(data[index]);
                  }
                }
                this.sprint = array; //rest spread sprint= {...data}
                console.log(result.prazo);
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
      this.sprint = this.sprint.filter((p) => p.id !== cards);
      this.todo = this.todo.filter((p) => p.id !== cards);
      this.done = this.done.filter((p) => p.id !== cards);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      //if para quando eu movo meu card mas coloco no mesmo lugar
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //else para quando o card muda de categoria
      transferArrayItem(
        event.previousContainer.data, //retorna os cards que ficaram no lugar onde o card que eu movi saiu
        event.container.data, //pega qual elemento eu estou mudando de categoria, mas em uma lista, pega mais de um
        event.previousIndex, //toda mudança de card, me retorna a posição na lista onde esse card estava(ex:se ele estava abaixo de um card, me retona 1)
        event.currentIndex //toda mudança de card, me retorna a posição na lista onde esse card foi parar(ex:se coloco abaixo de um card, me retona 1)
      );
      // console.log(event.container.id)// id da categoria que meu card sai
      // console.log( event.container.data[0]) //pega o id da categoria em que meu card é mandado
    }
    let data = event.container.data[0]; //pega as informaçoes do primeiro card da fila em que eu mudo, ou seja para eu mudar, preciso mudar para a primeira posição
    console.log(event.container.data[0])
    let indice = event.container.id;
    this.atualizaCategoria(data, indice);
  }

  atualizaCategoria(card: TarefaModule, indice: string) {
    const qualquer = indice.substring(14, 15);
    var status = '';
    if (qualquer == '0') {
      status = 'sprint';
    }
    if (qualquer == '1') {
      status = 'todo';
    }
    if (qualquer == '2') {
      status = 'done';
    }
    const data = {
      titulo: card.titulo,
      pessoa: card.pessoa,
      conteudo: card.conteudo,
      prazo: card.prazo,
      status: status,
    };
    this.cardsService.atualizaStatusTarefa(data, card.id).subscribe();
  }

  public filterCards(model: string) {
    if (model) {
      model = model.toLowerCase();
      this.sprint.map((card) => {
        card.pessoa.toLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
      this.todo.map((card) => {
        card.pessoa.toLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
      this.done.map((card) => {
        card.pessoa.toLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
    } else {
      this.sprint.map((card) => (card.show = true));
      this.todo.map((card) => (card.show = true));
      this.done.map((card) => (card.show = true));
    }
  }
  filterCategory(model: string) {
    if (model) {
      model.toLocaleLowerCase();
      this.sprint.map((card) => {
        card.status.toLocaleLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
      this.todo.map((card) => {
        card.status.toLocaleLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
      this.done.map((card) => {
        card.status.toLocaleLowerCase().includes(model)
          ? (card.show = true)
          : (card.show = false);
      });
    } else {
      this.sprint.map((card) => (card.show = true));
      this.todo.map((card) => (card.show = true));
      this.done.map((card) => (card.show = true));
    }
  }
}
