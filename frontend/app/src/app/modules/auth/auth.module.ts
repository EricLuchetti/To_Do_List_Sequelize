import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecuperarSenhaComponent,
    CadastrarComponent,
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
	SharedModule
  ],
  exports: [
	LoginComponent,
    RecuperarSenhaComponent
  ]
})
export class AuthModule { }
