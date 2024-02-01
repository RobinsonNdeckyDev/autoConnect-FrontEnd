export class Proprietaire {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  description: string;
  password: string;
  confirmation: string;
  image: string;
  role: string;

  constructor(
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    adresse: string,
    password: string,
    confirmation: string,
    description: string,
    image: string,
    role: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
    this.password = password;
    this.confirmation = confirmation
    this.description = description;
    this.image = image;
    this.role = "proprietaire";
  }
}

