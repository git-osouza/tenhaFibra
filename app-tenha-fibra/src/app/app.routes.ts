import { Routes } from '@angular/router';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';

export const routes: Routes = [
    { path: 'home', component: ConsultaCepComponent },
    { path: 'ofertas', component:  CardOfertasComponent},
    { path: '**', redirectTo: 'home' }
];
