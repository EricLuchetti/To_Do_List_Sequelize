import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PrioridadesComponent } from './pages/prioridades/prioridades.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'tarefas',
		pathMatch: 'full',
	},
	{
		path: 'tarefas',
		component: ListaComponent,
		canActivate: [ AuthGuard ],
	},
	{
		path: 'prioridades',
		component: PrioridadesComponent,
		canActivate: [ AuthGuard ],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class TarefaRoutingModule { }
