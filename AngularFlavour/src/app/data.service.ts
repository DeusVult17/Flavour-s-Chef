import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textSource = new BehaviorSubject<string>('');

  currentText = this.textSource.asObservable();
  idPre: number=0;
  asporto: Boolean=false;

  constructor() { }

  setId(id: number){
    this.idPre=id;
  }
  getId():number{
    return this.idPre;
  }


  setAsporto(flag:boolean){
    this.asporto= flag;
  }

  getAsporto():Boolean{
    return this.asporto;
  }


  changeText(text: string) {
    this.textSource.next(text);
  }
}