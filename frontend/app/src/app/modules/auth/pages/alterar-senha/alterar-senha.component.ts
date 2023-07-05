import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-alterar-senha',
	templateUrl: './alterar-senha.component.html',
	styleUrls: [ './alterar-senha.component.scss' ]
})
export class AlterarSenhaComponent {
	form!: FormGroup;
	hide = true;
	hideConfirmar = true;

	constructor (
		public dialog: MatDialog,
		private authService: AuthService,
		private router: Router
	) {
		this.initForm();
	}

	get requestTarefa() {
		let requestData = { ...this.form.getRawValue() };

		return requestData;
	}

	ngOnInit() {
	}

	initForm() {
		this.form = new FormGroup({
			senha: new FormControl(null, [ Validators.required ]),
			confirmarSenha: new FormControl(null, [ Validators.required ]),
		});
	}

	alterarSenha() {
		const params = this.requestTarefa;
		const codRecuperacaoRequest = sessionStorage.getItem('codigoRecuperacao');
		let cod_recuperacao = JSON.parse(codRecuperacaoRequest!);

		this.authService.alterarSenha(cod_recuperacao, params).subscribe({
			next: (data: any) => {
				Swal.fire({
					text: `Senha atualizada com sucesso!`,
					icon: 'success',
					showDenyButton: false,
					showCancelButton: false,
					showCloseButton: false,
					showConfirmButton: false,
				});

				this.dialog.closeAll();
				this.router.navigate([ 'auth' ]);

			},
			error: () => {
				this.dialog.closeAll();
			}
		});
	}
}
