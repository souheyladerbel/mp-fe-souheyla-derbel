import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent  implements OnInit{

  produits: Array<Produit> = [];
  produitCourant=new Produit();
  modeEdition:boolean=false;


  constructor(private produitsService :ProduitsService)
  {
  }

 ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();      
  }
  consulterProduits() {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
    .subscribe(
      {
        //En cas de succès
        next: data=> {
          console.log("Succès GET");
          this.produits=data;
        },

        //En cas d'erreur
        error: err=> {
          console.log("Erreur GET");
        }
      }
    )    
  }

   

    
   supprimerProduit(p: Produit)
   {
    //Afficher une boite de dialogue pour confirmer la suppression
     let reponse:boolean =confirm("Voulez vous supprimer le produit :"+p.designation+" ?");
     if (reponse==true)
     {
        console.log("Suppression confirmée..." );
        //chercher l'indice du produit à supprimer  
        let index: number = this.produits.indexOf(p);
        console.log("indice du produit à supprimer: "+index);
        if (index !== -1) 
        {

          //supprimer dans le BackEnd  
          this.produitsService.deleteProduit(p.id)
          .subscribe(
            {
              next: deletedProduit => {
                console.log("Succès DELETE");
                // Supprimer dans la partie Front End  (dans le tableau produits)
                this.produits.splice(index, 1);
                console.log("Suppressio du produit:"+p.designation);            
              },
              error: err=> {
                console.log("Erreur DELETE");
              }
            }
            )     
          
        }
     }
     else
     {
      console.log("Suppression annulée..." );     
     } 
  }

  editerProduit(p: Produit)
  {
     this.produitCourant.id=p.id;
     this.produitCourant.designation=p.designation;
     this.produitCourant.prix=p.prix;
     this.modeEdition=true;
 }
  validerFormulaire(form: NgForm) 
  {
    console.log(form.value);

      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau:boolean=true;
      let index=0;
      do{
       let p=this.produits[index];
        console.log(
             p.designation + ': ' +
            p.prix);
  
            if (p.id==form.value.id)
            {
              //rendre le mode à EDIT
              nouveau=false;
              console.log('ancien');
              
              let reponse:boolean =confirm("Produit existant. Confirmez vous la mise à jour de :"+p.designation+" ?");
              if (reponse==true)
                {
                    this.mettreAJourProduit(form.value , p);
                    this.modeEdition=false;                                   
                }
                else
                {
                  console.log("Mise à jour annulée");
                }              
              
              //Arrêter la boucle
              return;
            }
            else{
              //continuer à boucler
              index++;
            }           
      }
      while(nouveau && index<this.produits.length);
  }
    
   mettreAJourProduit(nouveau: Produit, ancien:Produit) {
    //mettre à jour dans le BackEnd  
    this.produitsService.updateProduit(ancien.id,nouveau)
    .subscribe(
      {
        next: produitModifie=> {
          console.log("Succès PUT");
          //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
          ancien.designation=nouveau.designation;
          ancien.prix=nouveau.prix;
            console.log('Mise à jour du produit:'+ancien.designation);
        },
        error: err=> {
          console.log("Erreur PUT");
        }
      }
      )    
 }
 

}

