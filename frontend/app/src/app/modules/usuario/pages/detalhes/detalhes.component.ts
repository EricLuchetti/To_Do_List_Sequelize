import { Usuario } from './../../models/Usuario';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EditarSenhaComponent } from '../../components/modal/editar-senha.component';

@Component({
	selector: 'app-detalhes',
	templateUrl: './detalhes.component.html',
	styleUrls: [ './detalhes.component.scss' ]
})
export class DetalhesComponent implements OnInit {
	@Input() tipoTarefaChild!: EventEmitter<any>;
	tipoTarefa: boolean = false;
	listaPrioridade: boolean = false;
	detalhes: boolean = true;
	tipoTarefaString = '';
	labelTitulo: string = 'Detalhes do Usuario';
	color: ThemePalette = 'accent';
	strokeWidth: number = 9;
	form!: FormGroup;
	dadosUsuario: Usuario = {
		nome: '',
		login: '',
		email: ''
	};

	constructor (
		private usuarioService: UsuarioService,
		private dialog: MatDialog
	) {
	}

	ngOnInit(): void {
		this.initForm();
		this.loadData();
	}

	subscribeToParentEmitter(): void {
		this.tipoTarefaChild.subscribe((data: string) => {
			this.tipoTarefaString = data;
			this.tipoLista();
		});
	}

	tipoLista(tipo: any = null) {
		this.listaPrioridade = false;
		this.tipoTarefa = false;
		this.detalhes = true;
	}

	get requestUsuario() {
		let requestData = { ...this.form.getRawValue() };

		return requestData;
	}

	initForm() {
		this.form = new FormGroup({
			nome: new FormControl(null, [ Validators.required ]),
			login: new FormControl(null, [ Validators.required ]),
			email: new FormControl(null, [ Validators.required ])
		});
	}

	loadData() {
		this.usuarioService.detalhar().subscribe({
			next: (data: Usuario) => {
				this.dadosUsuario.nome = data.nome;
				this.dadosUsuario.login = data.login;
				this.dadosUsuario.email = data.email;

				this.form.patchValue(this.dadosUsuario);
			}
		});
	}

	atualizar() {
		const params = this.requestUsuario;
		this.usuarioService.atualizar(params).subscribe({
			next: (data: any) => {
				Swal.fire({
					text: `Usuário atualizado!`,
					icon: 'success',
					showDenyButton: false,
					showCancelButton: false,
					showCloseButton: false,
					showConfirmButton: false,
				});

			}
		});
	}

	openModalEditarSenha() {
		const modalEditarSenha = this.dialog.open(EditarSenhaComponent, {
			width: '600px',
			height: '400px'
		});
		modalEditarSenha.componentInstance.enviarUsuario.subscribe(() => {
			this.loadData();
		});
	}
}
