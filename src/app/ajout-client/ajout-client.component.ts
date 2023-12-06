import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { NgForm } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css'],
})
export class AjoutClientComponent implements OnInit {
  nouveauClient: Client = new Client();
  ajoutSuccess: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  ajouterClient(clientForm: NgForm) {
    if (clientForm.valid) {
      this.clientService.saveClient(this.nouveauClient).subscribe(
        (res: Client) => {
          console.log('Client ajouté : ', res);
          this.ajoutSuccess = true;
          // Réinitialisation du formulaire ou d'autres opérations après l'ajout
          this.nouveauClient = new Client();
          clientForm.resetForm();
        },
        (error) => {
          console.error("Erreur lors de l'ajout du client : ", error);
          // Gestion de l'erreur lors de l'ajout du client
        }
      );
    } else {
      console.log('Formulaire invalide. Veuillez vérifier vos données.');
      // Gestion des cas où le formulaire est invalide
    }
  }
}
