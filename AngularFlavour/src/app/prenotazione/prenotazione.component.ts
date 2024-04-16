import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Risposta{   //risposat in formato json
  message:string;
}
@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrl: './prenotazione.component.css'
})
export class PrenotazioneComponent {
  form: FormGroup;
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue3: string = '';


  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.form = this.formBuilder.group({
      // Definisci qui i controlli del form
    });
  }

  submitForm() {
    if (this.form.valid) {
      console.log('1:', this.inputValue1);
      console.log('2:', this.inputValue2);
      console.log('3:', this.inputValue3);
      // Puoi qui fare altre operazioni come inviare i dati al server
    }
  }
}
