import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-cadastrar',
	templateUrl: './cadastrar.component.html',
	styleUrls: [ './cadastrar.component.scss' ]
})
export class CadastrarComponent {
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
			nome: new FormControl(null, [ Validators.required ]),
			email: new FormControl(null, [ Validators.required ]),
			login: new FormControl(null, [ Validators.required ]),
			senha: new FormControl(null, [ Validators.required ]),
			confirmarSenha: new FormControl(null, [ Validators.required ]),
		});
	}

	cadastrar() {
		const params = this.requestTarefa;

		this.authService.cadastrar(params).subscribe({
			next: (data: any) => {
				Swal.fire({
					text: `Usuário cadastrado com sucesso!`,
					icon: 'success',
					showDenyButton: false,
					showCancelButton: false,
					showCloseButton: false,
					showConfirmButton: false,
				});

				this.dialog.closeAll();
				this.router.navigate(['auth']);

			},
			error: () => {
				this.dialog.closeAll();
			}
		});
	}
}
