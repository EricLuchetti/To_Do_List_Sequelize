import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/Tarefa';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarEditarComponent } from '../../components/modal/criar-editar/criar-editar.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-prioridades',
	templateUrl: './prioridades.component.html',
	styleUrls: [ './prioridades.component.scss' ]
})
export class PrioridadesComponent {
	@Input() tipoTarefaChild!: EventEmitter<any>;
	tipoTarefa: boolean = false;
	tipoTarefaString = '';
	listaPrioridades: Tarefa[] = [];
	listaPrioridade: boolean = false;
	filtro: string = '';
	loader: boolean;
	temTarefa: boolean;
	color: ThemePalette = 'accent';
	strokeWidth: number = 9;
	tarefa!: Tarefa;
	labelTitulo: string = '';

	constructor (
		private router: Router,
		private service: TarefaService,
		private dialog: MatDialog) {
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
		if (tipo == 'Lista de Prioridades' || this.tipoTarefaString == 'Lista de Prioridades') {
			this.listarPrioridades();
			this.listaPrioridade = true;
			this.tipoTarefa = false;
		}
	}

	loadData() {
		this.listarPrioridades();
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

	listarPrioridades() {
		this.listaPrioridades = [];
		this.loader = true;
		this.temTarefa = true;
		this.labelTitulo = 'Minhas Prioridades';
		this.service.listarPrioridades().subscribe((data) => {
			setTimeout(() => {
				this.listaPrioridades = data;

				if (data.length == 0) {
					this.temTarefa = false;
				}

				this.loader = false;
			}, 800);
		});
	}

	pesquisarTarefas() {
		this.service.detalharPrioridades(this.filtro).subscribe((data) => {
			this.listaPrioridades = data;
		});
	}

	mudarPrioridade(tarefa: Tarefa) {
		this.service.mudarPrioridade(tarefa).subscribe(() => {
			this.listaPrioridades.splice(
				this.listaPrioridades.indexOf(tarefa), 1
			);

			if (this.listaPrioridades.length == 0) {
				this.temTarefa = false;
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
