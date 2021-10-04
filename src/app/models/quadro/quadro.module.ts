import { ColunasModule} from "../colunas/colunas.module";
export class QuadroModule {
  constructor(public colunas:ColunasModule[]){}
}
