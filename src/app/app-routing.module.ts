import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientComponent } from './client/client.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'client', component: ClientComponent },
  { path: 'ajout-client', component: AjoutClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
