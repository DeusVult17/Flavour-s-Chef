import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { timingSafeEqual } from 'crypto';



interface Risposta{   //risposta in formato json
  message:string;
  validation:Boolean;
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
  @Input() tipo:boolean= true; // per fare la funzione di prenotazione tavolo e piatto 
  @Input() img:String='';
  message:string;
  text: string;
  

  azioniEseguibili: AzioniEseguibili = {          //vanno inseriti qua i metodi una volta creati 
    scrivi: () => this.scrivi(),
    cambiaPagina:() =>this.cambiaPagina(),
    testo:() => this.testo(),
    //comanda:() => this.comanda(),
  };
  //
  constructor(private http: HttpClient,private router: Router,private dataService: DataService){
    this.message='';
    this.text='';
    this.dataService.currentText.subscribe(text => this.text = text);
  }
  //
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

  testo(){
    console.log('Testo ricevuto:', this.text);
  }


  

  cambiaPagina() {
    //console.log(this.tipo);
    // if(this.tipo==false){
    //   console.log("tua mamma");
    //   this.dataService.cambia();
    //   this.tipo=true;
    //   this.router.navigate(['/', this.pagina]);
    // }else{
    //   if(this.dataService.mostra()==false){
    //     console.log("splende");
    //     this.dataService.cambia();
    //     this.router.navigate(['/', this.pagina]);
    //   }else{
    //     console.log("come il tesoro di un famoso re");
        
    //   }

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
