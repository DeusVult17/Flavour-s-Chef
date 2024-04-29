import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textSource = new BehaviorSubject<string>('');

  currentText = this.textSource.asObservable();
  cambio: Boolean=true;
  idPre: number=0;
  asporto: Boolean=false;

  constructor() { }

  setId(id: number){
    this.idPre=id;
  }
  getId():number{
    return this.idPre;
  }

  setAsporto(){
    this.asporto= !this.asporto;
  }

  getAsporto():Boolean{
    return this.asporto;
  }

  cambia(){
    this.cambio=!this.cambio;
  }

  mostra():Boolean{
    return this.cambio;
  }

  changeText(text: string) {
    this.textSource.next(text);
  }
}