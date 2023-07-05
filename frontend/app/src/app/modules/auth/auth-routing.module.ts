import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';

const routes: Routes = [ {
	path: '',
	redirectTo: 'login',
	pathMatch: 'full',
},
{
	path: 'login',
	component: LoginComponent,
},
{
	path: 'recuperar-senha',
	component: RecuperarSenhaComponent
},
{
	path: 'alterar-senha',
	component: AlterarSenhaComponent
},
{
	path: 'cadastrar',
	component: CadastrarComponent,
} ];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AuthRoutingModule { }
