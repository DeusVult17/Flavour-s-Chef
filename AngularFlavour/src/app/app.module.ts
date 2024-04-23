import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TesterComponent } from './tester/tester.component'
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


import { provideHttpClient, withFetch } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SelezioneComponent } from './selezione/selezione.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { OrdinazioneComponent } from './ordinazione/ordinazione.component';
@NgModule({
  declarations: [
    AppComponent,
    TesterComponent,
    HomeComponent,
    SelezioneComponent,
    PrenotazioneComponent,
    TextfieldComponent,
    OrdinazioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatInputModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
