import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-recuperar-senha',
	templateUrl: './recuperar-senha.component.html',
	styleUrls: [ './recuperar-senha.component.scss' ]
})
export class RecuperarSenhaComponent {
	form!: FormGroup;
	formCodigo!: FormGroup;
	hide = true;

	constructor (
		private toastrService: ToastrService,
		private authService: AuthService,
		private router: Router
	) {
		this.initForm();
	}

	ngOnInit() {
	}

	initForm() {
		this.form = new FormGroup({
			login: new FormControl(null, [ Validators.required ]),
			email: new FormControl(null, [ Validators.required ]),
		});
	}

	initFormCodigo() {
		this.formCodigo = new FormGroup({
			codigo: new FormControl(null, [ Validators.required ]),
		});
	}

	enviarCodigo() {
		if (!this.form.valid) return;
		const params = this.form.getRawValue();
		this.authService.enviarCodigo(params).subscribe({
			next: (data: any) => {
				this.initFormCodigo();
				this.hide = false;
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	reenviarCodigo() {
		const params = this.form.getRawValue();
		this.authService.enviarCodigo(params).subscribe({
			next: (data: any) => {
				this.toastrService.info('Um novo código foi enviado ao seu e-mail.', 'Código Enviado!', {
					timeOut: 3000,
				});
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	validarCodigo() {
		const cod_recuperacao = this.formCodigo.value.codigo;
		this.authService.validarCodigo(cod_recuperacao).subscribe({
			next: (data: any) => {
				this.router.navigateByUrl('auth/alterar-senha');
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}
}
