import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarSenhaComponent } from './components/modal/editar-senha.component';


@NgModule({
  declarations: [
    DetalhesComponent,
    EditarSenhaComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
	SharedModule
  ]
})
export class UsuarioModule { }
