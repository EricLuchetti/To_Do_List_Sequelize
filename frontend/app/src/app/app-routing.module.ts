import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './modules/tarefa/pages/lista/lista.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'listar',
		loadChildren: () => import('./modules/tarefa/tarefa.module').then((m) => m.TarefaModule)
	},
	{
		path: 'usuario',
		loadChildren: () => import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule)
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
