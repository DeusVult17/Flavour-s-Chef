import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'console';

interface Risposta{
  message:string;
}


@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrl: './tester.component.css'
})
export class TesterComponent {

  message:String;

  constructor(private http: HttpClient){
    this.message='';
  }

    scrivi(){
      // this.http.get<string>('http://localhost:8080/ciao').subscribe(Response =>{
      //   console.log(Response);
      // }), (error) =>{
      //   console.log("errore:",error);
      // }
      this.http.get<Risposta>('http://localhost:8080/ciao').subscribe(
        (response) => {
          this.message=response.message;
          console.log('Risposta ricevuta:', this.message);
        },
        (error) => {
          console.error('Errore nella richiesta:', error);
        }
      );

    }
}
