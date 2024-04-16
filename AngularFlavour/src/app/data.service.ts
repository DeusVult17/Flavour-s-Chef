import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textSource = new BehaviorSubject<string>('');

  currentText = this.textSource.asObservable();

  constructor() { }

  changeText(text: string) {
    this.textSource.next(text);
  }
}