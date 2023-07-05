import { ListaComponent } from '../../../modules/tarefa/pages/lista/lista.component';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tarefa } from '../../../modules/tarefa/models/Tarefa';
import { CriarEditarComponent } from '../../../modules/tarefa/components/modal/criar-editar/criar-editar.component';

@Component({
	selector: 'app-rodape',
	templateUrl: './rodape.component.html',
	styleUrls: [ './rodape.component.scss' ]
})
export class RodapeComponent {

	@Output() listarTarefas = new EventEmitter<any>();
	@Input() tipoTarefa!: boolean;
	@Input() detalhes!: boolean;
	@Input() tema!: boolean;
	tarefa!: Tarefa;
	prioridades: boolean = false;
	tarefas: boolean = false;

	constructor (
		private router: Router,
		public dialog: MatDialog
	) { };

	openModalNovaTarefa() {
		const modalNovaTarefa = this.dialog.open(CriarEditarComponent, {
			width: '600px',
			height: '300px'
		});
		modalNovaTarefa.componentInstance.tarefa = this.tarefa;
		modalNovaTarefa.componentInstance.enviarTarefa.subscribe(() => {
			if (this.router.url == '/listar/tarefas') {
				this.listarTarefas.emit('Lista de Tarefas');
			} else if (this.router.url == '/listar/prioridades') {
				this.listarTarefas.emit('Lista de Prioridades');
			}
		});
	}

	listar() {
		this.prioridades = false;
		this.tarefas = true;

		this.listarTarefas.emit('Lista de Tarefas');
		this.router.navigate([ 'listar/tarefas' ]);
	}

	listarPrioridades() {
		this.prioridades = true;
		this.tarefas = false;

		this.listarTarefas.emit('Lista de Prioridades');
		this.router.navigate([ 'listar/prioridades' ]);
	}
}
