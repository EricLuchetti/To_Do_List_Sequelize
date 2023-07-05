import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/Tarefa';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarEditarComponent } from '../../components/modal/criar-editar/criar-editar.component';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent {
	@Input() tipoTarefaChild!: EventEmitter<any>;
	tipoTarefa: boolean = true;
	listaTarefas: Tarefa[] = [];
	filtro: string = '';
	loader: boolean;
	temTarefa: boolean;
	color: ThemePalette = 'accent';
	strokeWidth: number = 9;
	listaPrioridade: boolean = false;
	tipoTarefaString = '';
	tarefa!: Tarefa;
	labelTitulo: string = '';

	constructor (
		private service: TarefaService,
		private dialog: MatDialog
	) {
		this.loader = false;
		this.temTarefa = true;
	}

	ngOnInit(): void {
		this.loader = true;
		this.loadData();
	}

	subscribeToParentEmitter(): void {
		this.tipoTarefaChild.subscribe((data: string) => {
			this.tipoTarefaString = data;
			this.tipoLista();
		});
	}

	tipoLista(tipo: any = null) {
		if (tipo == 'Lista de Tarefas' || this.tipoTarefaString == 'Lista de Tarefas') {
			this.listar();
			this.listaPrioridade = false;
			this.tipoTarefa = true;
		}
	}

	loadData() {
		this.listar();
	}

	prioridade(tarefa: Tarefa): string {
		if (tarefa.prioridade == true) {
			return 'star';
		} else {
			return 'star_border';
		}
	}

	concluida(tarefa: Tarefa): string {
		if (tarefa.concluida == true) {
			return 'check_box';
		} else {
			return 'check_box_outline_blank';
		}
	}

	listar() {
		this.listaTarefas = [];
		this.loader = true;
		this.temTarefa = true;
		this.labelTitulo = 'Minhas Tarefas';
		this.service.listarTarefas().subscribe((data) => {
			setTimeout(() => {
				this.listaTarefas = data;

				if (data.length == 0) {
					this.temTarefa = false;
				}

				this.loader = false;
			}, 800);
		});
	}

	pesquisarTarefas() {
		this.service.detalharTarefas(this.filtro).subscribe((data) => {
			this.listaTarefas = data;
		});
	}

	mudarPrioridade(tarefa: Tarefa) {
		this.service.mudarPrioridade(tarefa).subscribe(() => {
			if (this.listaPrioridade == true) {
				this.listaTarefas.splice(
					this.listaTarefas.indexOf(tarefa), 1
				);

				if (this.listaTarefas.length == 0) {
					this.temTarefa = false;
				}
			}
		});
	}

	concluir(tarefa: Tarefa) {
		this.service.concluir(tarefa).subscribe();
	}

	openModalNovaTarefa() {
		const modalNovaTarefa = this.dialog.open(CriarEditarComponent, {
			width: '600px',
			height: '300px'
		});
		modalNovaTarefa.componentInstance.tarefa = this.tarefa;
		modalNovaTarefa.componentInstance.enviarTarefa.subscribe(() => {
			this.loadData();
		});
	}

	editar(tarefa: Tarefa) {
		const modal = this.dialog.open(CriarEditarComponent, {
			width: '600px',
			height: '300px'
		});
		modal.componentInstance.tarefa = tarefa;
		modal.componentInstance.enviarTarefa.subscribe(() => {
			this.loadData();
		});
	}

	async excluir(tarefa: Tarefa) {
		await Swal.fire({
			title: `${tarefa.tarefa}`,
			text: `Tem certeza que deseja excluir a tarefa?`,
			icon: 'question',
			showDenyButton: true,
			showCancelButton: false,
			showCloseButton: true,
			confirmButtonText: 'Sim',
			confirmButtonColor: 'rgb(223, 189, 67)',
			denyButtonColor: 'grey',
			denyButtonText: `Não`,
		}).then((resultado) => {
			if (resultado.isConfirmed) {
				this.service.excluirTarefa(tarefa.cod_tarefa)
					.subscribe(() => {
						Swal.fire({
							title: 'Sucesso',
							text: `Tarefa excluída com sucesso`,
							icon: 'success',
							showDenyButton: false,
							showCancelButton: false,
							showCloseButton: true,
							confirmButtonColor: 'rgb(223, 189, 67)',
							denyButtonColor: 'grey',
						});
						this.loadData();
					});
			} else {
				Swal.close();
			}
		});

	}

}
