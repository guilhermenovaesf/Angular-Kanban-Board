import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export class TarefaModule {



  constructor(public titulo:string,public pessoa:string,public conteudo:string,public prazo:string ){

    this.titulo =titulo
    this.pessoa = pessoa
    this.conteudo = conteudo
    this.prazo=prazo
  }

 }
