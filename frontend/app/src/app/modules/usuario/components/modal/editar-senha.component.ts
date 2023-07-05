import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'app-editar-senha',
	templateUrl: './editar-senha.component.html',
	styleUrls: [ './editar-senha.component.scss' ]
})
export class EditarSenhaComponent {
	@Input() usuario!: Usuario;
	@Output() enviarUsuario = new EventEmitter<any>();

	form!: FormGroup;
	isEdit = false;
	botaoLabel: string = '';
	hide = true;
	hideSenhaNova = true;
	hideConfirmarSenhaNova = true;

	constructor (
		public dialog: MatDialog,
		private usuarioService: UsuarioService,
	) { }

	ngOnInit(): void {
		this.botaoLabel = 'Atualizar';

		this.initForm();
	}

	get requestUsuario() {
		let requestData = { ...this.form.getRawValue() };

		return requestData;
	}

	initForm() {
		this.form = new FormGroup({
			senhaAtual: new FormControl(null, [ Validators.required ]),
			senha: new FormControl(null, [ Validators.required ]),
			confirmarSenha: new FormControl(null, [ Validators.required ])
		});
	}

	atualizar() {
		const params = this.requestUsuario;
		this.usuarioService.atualizar(params).subscribe(() => {
			Swal.fire({
				text: `Senha atualizada com sucesso!`,
				icon: 'success',
				showDenyButton: false,
				showCancelButton: false,
				showCloseButton: false,
				showConfirmButton: false,
			});

			this.enviarUsuario.emit();
			this.dialog.closeAll();

		});

	}
}
