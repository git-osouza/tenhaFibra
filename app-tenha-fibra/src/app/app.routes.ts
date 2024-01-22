import { Routes } from '@angular/router';
import { ConsultaCepComponent } from './components/consulta-cep/consulta-cep.component';
import { CardOfertasComponent } from './components/card-ofertas/card-ofertas.component';
import { ModalControllerComponent } from './components/modal-controller/modal-controller.component';
import { ContratacaoComponent } from './components/contratacao/contratacao.component';

export const routes: Routes = [
    { path: 'home', component: ConsultaCepComponent },
    { path: 'ofertas', component:  CardOfertasComponent},
    { path: 'contratacao', component:  ModalControllerComponent},
    { path: '**', redirectTo: 'home' }
];
