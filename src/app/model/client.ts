export class Client {
  id: number | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  adresse: string | undefined;
  numero: number | undefined;
  actif: boolean | undefined;
  chiffreAffaires: number | undefined;
  factures: Array<number> = [];

  MontantF: number | undefined;
}
