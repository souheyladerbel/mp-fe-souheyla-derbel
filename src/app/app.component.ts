import { Component } from '@angular/core';
import { Produit } from './model/produit';
import { Client } from './model/client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  actionC: Array<any> = [
    { titre: 'Accueil', route: '/accueil' },
    { titre: 'Liste des clients', route: '/client' },
    { titre: 'Ajouter client', route: '/ajout-client' },
  ];

  actions: Array<any> = [
    { titre: 'Accueil', route: '/accueil' },
    { titre: 'Liste des produits', route: '/produits' },
    { titre: 'Ajouter Produit', route: '/ajouterProduit' },
  ];

  actionCourante: any;

  setActionCourante(a: any) {
    this.actionCourante = a;
  }
}
