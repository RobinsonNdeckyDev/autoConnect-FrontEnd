import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { VendeurSubscribeComponent } from './components/auth/vendeur-subscribe/vendeur-subscribe.component';
import { AcheteurSubscribeComponent } from './components/auth/acheteur-subscribe/acheteur-subscribe.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'subscribe_vendeur', component: VendeurSubscribeComponent },
  { path: 'subscribe_acheteur', component: AcheteurSubscribeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'proprietaire',
    loadChildren: () =>
      import('./components/proprietaire/proprietaire.module').then(
        (m) => m.ProprietaireModule), canActivate: [AuthGuard] 
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/users/user.module').then((m) => m.UserModule),
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// , canActivate: [AuthGuard] 