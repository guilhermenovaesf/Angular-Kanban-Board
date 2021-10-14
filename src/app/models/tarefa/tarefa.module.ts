import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export class TarefaModule {
  constructor(
    public id: number,
    public titulo: string,
    public pessoa: string,
    public conteudo: string,
    public prazo: Date
  ) {
    this.id = id;
    this.titulo = titulo;
    this.pessoa=pessoa
    this.conteudo = conteudo;
    this.prazo = prazo;
  }
}
