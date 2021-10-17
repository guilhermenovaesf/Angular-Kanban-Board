import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit {
  txtQueryChanged: Subject<string> = new Subject<string>();
  constructor() {
    this.txtQueryChanged
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((model) => {});
  }

  ngOnInit(): void {}
  changeTextTrail(query: string) {
    this.txtQueryChanged.next(query);
  }
  searchQuery() {}
}
