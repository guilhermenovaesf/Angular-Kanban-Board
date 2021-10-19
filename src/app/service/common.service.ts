import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 public txtQueryChanged: Subject<string> = new Subject<string>();
 public txtQueryChangedCategory: Subject<string> = new Subject<string>();
  constructor() { }
}
