import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefaRoutingModule } from './tarefa-routing.module';
import { ListaComponent } from './pages/lista/lista.component';
import { PrioridadesComponent } from './pages/prioridades/prioridades.component';
import { CriarEditarComponent } from './components/modal/criar-editar/criar-editar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
	declarations: [
		ListaComponent,
		PrioridadesComponent,
		CriarEditarComponent
	],
	imports: [
		CommonModule,
		TarefaRoutingModule,
		SharedModule
	]
})
export class TarefaModule { }
