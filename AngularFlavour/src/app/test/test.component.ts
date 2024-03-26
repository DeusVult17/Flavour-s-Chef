import { Component } from '@angular/core';



@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

    scrivi(){
      console.log("ADFIOAIJA")
    }

  /*public eseguiAzione() { //QUESTO METODO AL 90% CI SERVIRA' QUINDI TIENILO
    if(this.azione!='')
    {
      eval(`this.${this.azione}(${this.parametri})`);
    }
      
  }*/ 
}
