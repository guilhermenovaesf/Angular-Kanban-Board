import { TarefaModule } from './../tarefa/tarefa.module';

//import { Tarefa } from 'src/app/interface/tarefa';

export class ColunasModule {
  constructor(public tarefas:TarefaModule[]){}
 }
