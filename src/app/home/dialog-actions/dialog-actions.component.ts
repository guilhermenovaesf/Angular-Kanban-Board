import { TarefaModule } from './../../models/tarefa/tarefa.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.css'],
})
export class DialogActionsComponent implements OnInit {
  isChange!: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarefaModule
  ) {}

  ngOnInit(): void {
    if (this.data.titulo != '') {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
