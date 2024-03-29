import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
    constructor(private http: HttpClient){}

    scrivi(){
      this.http.get<string>('/ciao').subscribe(Response =>{
        console.log(Response);
      })
      console.log("ADFIOAIJA")
    }

}
