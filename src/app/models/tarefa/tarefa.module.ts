import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export class TarefaModule {
  constructor(
    public id: number,
    public titulo: string,
    public pessoa: string,
    public conteudo: string,
    public prazo: Date,
    public status:string,
    public show:boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.pessoa=pessoa;
    this.conteudo = conteudo;
    this.prazo = prazo;
    this.status =status
    this.show=true;
  }
}
