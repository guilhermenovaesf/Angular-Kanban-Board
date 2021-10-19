import { CommonService } from './../../service/common.service';
import { TarefaModule } from './../../models/tarefa/tarefa.module';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { CategoriasComponent } from '../categorias/categorias.component';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit {
  searchQuery: string = '';
  searchCategory:string='';

  constructor(
    private commonService:CommonService
  ) {

  }

  ngOnInit(): void {}
  getDigitoTeclado(query: string) {

    this.commonService.txtQueryChanged.next(query);
  }
  getDigitoTecladoCategoria(query: string) {
query=query.replace(" ","")
    this.commonService.txtQueryChangedCategory.next(query);
  }
}
