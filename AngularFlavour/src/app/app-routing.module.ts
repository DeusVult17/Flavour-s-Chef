import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrenotazioneComponent} from './prenotazione/prenotazione.component'
import { OrdinazioneComponent} from './ordinazione/ordinazione.component'
import {MenuComponent} from './menu/menu.component'
import { AsportoComponent } from './asporto/asporto.component';
import { TavpiattiComponent } from './tavpiatti/tavpiatti.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ordinazione',component: OrdinazioneComponent},
  {path: 'prenotazione', component: PrenotazioneComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'asporto',component:AsportoComponent},
  {path: 'tavpiatti',component:TavpiattiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
