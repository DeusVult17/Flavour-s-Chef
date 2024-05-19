import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';

interface Prenotazione {
  email: string;
  data: string;
  persone: number;
  tavolo: number;
}

interface Ordine {
  piatto: string;
  quantita: number;
}

@Component({
  selector: 'app-visordinazioni',
  templateUrl: './visordinazioni.component.html',
  styleUrl: './visordinazioni.component.css'
})
export class VisordinazioniComponent implements OnInit{

  reservations: Prenotazione[] = [];
  selectedEmail: string | null = null;
  orders: Ordine[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get<Prenotazione[]>('http://localhost:8080/vispreno').subscribe(
      (response) => {
        this.reservations = response;
      },
      (error) => {
        console.error('Errore nel caricamento delle prenotazioni:', error);
      }
    );
  }


  selectReservation(email: string) {
    this.selectedEmail=email;
    const body={
      mail: email
    }

    this.orders = [
      { piatto: 'Lasagne al forno', quantita: 3 },
      { piatto: 'Tiramisù', quantita: 2 }
    ];

    this.http.post<Ordine[]>(`http://localhost:8080/visord`,body).subscribe(
      (response) => {
        this.orders = response;
        console.log(this.orders);
        
      },
      (error) => {
        console.error('Errore nel caricamento degli ordini:', error);
      }
    );


  }

}
