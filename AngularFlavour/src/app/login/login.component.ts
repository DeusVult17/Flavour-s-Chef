import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  user: string = '';
  password: string='';
  

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,private servizio: DataService){
    this.form = this.formBuilder.group({

    });
  }


  entra(){

    if(this.user=="admin" && this.password=="admin"){
      this.router.navigate(['/admin']);

    }else{
      alert('AUTORIZZAZIONE FALLITA');
    }


  }
}
