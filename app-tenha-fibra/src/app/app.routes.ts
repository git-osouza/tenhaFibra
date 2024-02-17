import { Routes } from '@angular/router';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    { path: 'home', component: ConsultaCepComponent },
    { path: 'ofertas', component:  CardOfertasComponent},
    { path: 'painel', component:  AuthComponent},
    { path: '**', redirectTo: 'home' }
];
