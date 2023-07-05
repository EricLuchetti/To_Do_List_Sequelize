import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'detalhes',
		pathMatch: 'full',
	},
	{
		path: 'detalhes',
		component: DetalhesComponent,
		canActivate: [ AuthGuard ],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class UsuarioRoutingModule { }
