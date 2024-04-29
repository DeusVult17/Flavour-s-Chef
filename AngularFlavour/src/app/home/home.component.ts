import { Component,OnInit  } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private myService: DataService) { } // Inietta il service nel costruttore

  // metodo(){
  //   this.myService.cambia();
  // }
}
