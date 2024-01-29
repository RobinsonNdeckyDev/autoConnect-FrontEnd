export class Acheteur {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmation: string;
  telephone: string;
  adresse: string;
  role: string;

  constructor(
    nom: string,
    prenom: string,
    email: string,
    password: string,
    confirmation: string,
    telephone: string,
    adresse: string,
    role: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.confirmation = confirmation;
    this.telephone = telephone;
    this.adresse = adresse;
    this.role = 'acheteur';
  }
}
