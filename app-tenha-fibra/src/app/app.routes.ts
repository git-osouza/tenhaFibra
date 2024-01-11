import { Routes } from '@angular/router';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';

export const routes: Routes = [
    { path: 'home', component: ConsultaCepComponent },
    { path: 'ofertas', component:  CardOfertasComponent},
    { path: '**', redirectTo: 'home' }
];
