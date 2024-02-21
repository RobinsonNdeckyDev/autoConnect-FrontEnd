// import {
//   ComponentFixture,
//   TestBed,
//   tick,
//   fakeAsync,
// } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { LoginComponent } from '../components/auth/login/login.component';
// import { AuthenticationService } from 'src/app/services/authentification.service';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: AuthenticationService; 
//   let router: Router;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [RouterTestingModule],
//       // Fournir AuthenticationService
//       providers: [AuthenticationService],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     // Injecter AuthenticationService
//     authService = TestBed.inject(AuthenticationService);
//     // Injecter Router
//     router = TestBed.inject(Router);
//     fixture.detectChanges();
//   });

//   // Test pour vérifier que le composant est créé avec succès
//   it('devrait être créé', () => {
//     expect(component).toBeTruthy();
//   });

//   // Test pour valider le formulaire de connexion avec des identifiants valides
//   it('devrait valider le formulaire de connexion avec des identifiants valides', () => {
//     component.email = 'test@example.com';
//     component.password = '123456';
//     expect(component.validateFormLogin()).toBeTrue();
//   });

//   // Test pour valider le formulaire de connexion avec un email invalide
//   it('devrait valider le formulaire de connexion avec un email invalide', () => {
//     // Email invalide
//     component.email = 'invalidemail';
//     component.password = '123456';
//     // Doit retourner false car l'email est invalide
//     expect(component.validateFormLogin()).toBeFalse();
//   });

//   // Test pour valider le formulaire de connexion avec un mot de passe vide
//   it('devrait valider le formulaire de connexion avec un mot de passe vide', () => {
//     component.email = 'test@example.com';
//     // Mot de passe vide
//     component.password = '';
//     // Doit retourner false car le mot de passe est vide
//     expect(component.validateFormLogin()).toBeFalse();
//   });

//   // Test pour vérifier si la méthode validateFormLogin est appelée lors de l'appel de login
//   it('devrait appeler validateFormLogin lorsque la méthode de connexion est appelée', () => {
//     // Espionner la méthode validateFormLogin
//     spyOn(component, 'validateFormLogin');
//     // Appeler la méthode login
//     component.login();
//     // Vérifier si validateFormLogin a été appelé
//     expect(component.validateFormLogin).toHaveBeenCalled();
//   });

//   // Test pour vérifier si la méthode registerProprietaire est appelée lors de l'appel de login
//   it('devrait appeler registerProprietaire lorsque la méthode de connexion est appelée', fakeAsync(() => {
//     // Espionner la méthode registerProprietaire
//     spyOn(component, 'registerProprietaire');
//     component.email = 'test@example.com';
//     component.password = '123456';
//     // Appeler la méthode login
//     component.login();
//     // Attendre les opérations asynchrones
//     tick();
//     // Vérifier si registerProprietaire a été appelé
//     expect(component.registerProprietaire).toHaveBeenCalled();
//   }));

//   // Test pour vérifier si l'utilisateur est redirigé vers la page admin si le rôle est admin
//   it("devrait rediriger l'utilisateur vers la page admin si le rôle est admin", fakeAsync(() => {
//     // Espionner la méthode navigate du Router
//     spyOn(router, 'navigate');
//     spyOn(authService, 'login').and.returnValue(
//       // Simuler le retour d'un utilisateur avec le rôle 'admin'
//       of({ user: { role: 'admin' } })
//     );
//     // Appeler la méthode login
//     component.login();
//     // Attendre les opérations asynchrones
//     tick();
//     // Vérifier si l'utilisateur est redirigé vers la page admin
//     expect(router.navigate).toHaveBeenCalledWith(['/admin']);
//   }));
// });
