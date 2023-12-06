import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client'; // Assurez-vous d'importer le modèle Client
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service'; // Assurez-vous d'importer le service de gestion des clients

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Array<Client> = [];
  clientCourant = new Client();
  modeEdition = false;
  searchText: string = '';
  c: any;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    console.log('Initialisation du composant...');
    this.fetchClients();
  }

  fetchClients() {
    console.log('Récupération de la liste des clients...');
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        console.log('GET réussi');
        this.clients = data;
      },
      error: (err) => {
        console.log('Erreur GET');
      },
    });
  }
  searchClients() {
    if (this.searchText.trim() !== '') {
      // Utilisation de filter pour rechercher les clients correspondant au texte
      this.clients = this.clients.filter(
        (client) =>
          client.nom &&
          client.nom.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // Si le champ de recherche est vide, réinitialiser la liste des clients
      this.fetchClients();
    }
  }

  deleteClient(client: Client) {
    if (client.id !== undefined) {
      let confirmDelete = confirm(
        'Voulez-vous supprimer le client : ' + client.nom + ' ?'
      );
      if (confirmDelete) {
        console.log('Suppression confirmée...');
        let index: number = this.clients.indexOf(client);
        if (index !== -1) {
          this.clientService.deleteClient(client.id).subscribe({
            next: (deletedClient) => {
              console.log('DELETE réussi');
              this.clients.splice(index, 1);
              console.log('Suppression du client : ' + client.nom);
            },
            error: (err) => {
              console.log('Erreur DELETE');
            },
          });
        }
      } else {
        console.log('Suppression annulée...');
      }
    } else {
      console.log('ID du client non défini');
      // Gérer le cas où l'ID du client n'est pas défini (affichage message d'erreur, etc.)
      alert('ID du client non défini, suppression impossible');
    }
  }
  editClient(c: Client) {
    this.clientCourant.id = c.id;
    this.clientCourant.nom = c.nom;
    this.clientCourant.prenom = c.prenom;
    this.clientCourant.numero = c.numero;
    this.clientCourant.adresse = c.adresse;
    this.clientCourant.actif = c.actif;

    this.modeEdition = true;
  }

  validateForm(form: NgForm) {
    console.log(form.value);
    let isNew = true;
    let index = 0;

    do {
      let c = this.clients[index];

      if (c.id == form.value.id) {
        isNew = false;
        let confirmUpdate = confirm(
          'Client existant. Confirmez-vous la mise à jour de : ' + c.nom + ' ?'
        );
        if (confirmUpdate) {
          this.updateClient(form.value, c);
          this.modeEdition = false;
        } else {
          console.log('Mise à jour annulée');
        }
        return;
      } else {
        index++;
      }
    } while (isNew && index < this.clients.length);
  }

  updateClient(newClient: Client, existingClient: Client) {
    if (
      existingClient.id !== undefined &&
      typeof existingClient.id === 'number'
    ) {
      this.clientService.updateClient(existingClient.id, newClient).subscribe({
        next: (updatedClient) => {
          console.log('PUT réussi');
          // Mettre à jour les propriétés du client existant avec les nouvelles valeurs
          existingClient.id =
            newClient.id !== undefined ? newClient.id : existingClient.id;
          existingClient.nom =
            newClient.nom !== undefined ? newClient.nom : existingClient.nom;
          existingClient.prenom =
            newClient.prenom !== undefined
              ? newClient.prenom
              : existingClient.prenom;
          existingClient.adresse =
            newClient.adresse !== undefined
              ? newClient.adresse
              : existingClient.adresse;
          existingClient.actif =
            newClient.actif !== undefined
              ? newClient.actif
              : existingClient.actif;
          // Ajouter d'autres propriétés à mettre à jour si nécessaire

          console.log('Mise à jour du client : ' + existingClient.nom);
        },
        error: (err) => {
          console.log('Erreur PUT');
        },
      });
    } else {
      console.log('ID du client existant non défini ou non valide');
      alert(
        'ID du client existant non défini ou non valide, mise à jour impossible'
      );
    }
  }
}
