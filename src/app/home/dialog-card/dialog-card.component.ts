import { ColunasModule } from './../../models/colunas/colunas.module';
import { TarefaModule } from './../../models/tarefa/tarefa.module';
import { CategoriasComponent } from './../categorias/categorias.component';
import { Component, Inject, Input, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
minor: any;

  

constructor(
  @Inject(MAT_DIALOG_DATA)
   public card: TarefaModule, 
  public dialogRef: MatDialogRef<DialogElementsExampleDialog>)
  {}



onCancel(): void {
  this.dialogRef.close();
}
}

