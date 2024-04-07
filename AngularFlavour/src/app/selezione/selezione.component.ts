import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Risposta{   //risposat in formato json
  message:string;
}

interface AzioniEseguibili {
  [key: string]: (parametri?: any) => void;
}


@Component({
  selector: 'app-selezione',
  templateUrl: './selezione.component.html',
  styleUrl: './selezione.component.css'
})
// Aggiungi altre associazioni metodo-azione qui, se necessario


export class SelezioneComponent {
  @Input() nome: String ='';    //nome del pulsante
  @Input() azione: string = ''; //che metodo farà
  @Input() parametri: string = '';  //parametri se servono per il metodo
  @Input() pagina: string = ''; // pagina a cui si verrà reinderizzati

  message:string;

  azioniEseguibili: AzioniEseguibili = {          //vanno inseriti qua i metodi una volta creati 
    scrivi: () => this.scrivi(),
    cambiaPagina:() =>this.cambiaPagina(),
  };
  



  constructor(private http: HttpClient,private router: Router){
    this.message='';

  }


  public eseguiAzione() {   //serve per eseguire gli altri metodi

    // if(this.azione!='')
    // {
    //   eval(`this.${this.azione}(${this.parametri})`);
    // }

    const metodo = this.azioniEseguibili[this.azione];
    if (metodo) {
      metodo(this.parametri);
    }
  }

  cambiaPagina() {
    this.router.navigate(['/', this.pagina]);
    
  }

  scrivi(){      //richiesta get http al server  TEST POI DA TOGLIERE
      
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
