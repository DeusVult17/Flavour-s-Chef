import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrenotazioneComponent} from './prenotazione/prenotazione.component'
import { OrdinazioneComponent} from './ordinazione/ordinazione.component'

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ordinazione',component: OrdinazioneComponent},
  {path: 'prenotazione', component: PrenotazioneComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
