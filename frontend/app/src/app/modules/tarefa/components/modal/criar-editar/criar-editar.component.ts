import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Tarefa } from '../../../models/Tarefa';
import { TarefaService } from '../../../services/tarefa.service';


@Component({
	selector: 'app-criar-editar',
	templateUrl: './criar-editar.component.html',
	styleUrls: [ './criar-editar.component.scss' ]
})
export class CriarEditarComponent {
	@Input() tarefa!: Tarefa;
	@Output() enviarTarefa = new EventEmitter<any>();

	form!: FormGroup;
	isEdit = false;
	botaoLabel: string = '';

	constructor (
		public dialog: MatDialog,
		private service: TarefaService,
	) { }

	ngOnInit(): void {
		this.isEdit = this.tarefa != undefined;
		if (this.isEdit) {
			this.botaoLabel = 'Atualizar';
		} else {
			this.botaoLabel = 'Adicionar';
		}
		this.initForm();
		this.setFormValues();
	}

	get requestTarefa() {
		let requestData = { ...this.form.getRawValue() };

		return requestData;
	}

	setFormValues() {
		if (!this.isEdit) return;
		this.form.patchValue(this.tarefa);
	}

	initForm() {
		this.form = new FormGroup({
			tarefa: new FormControl(null, [ Validators.required ]),
			horario: new FormControl(null, [ Validators.required ]),
			prioridade: new FormControl(null, [ Validators.required ])
		});
	}

	enviar() {
		if (!this.form.valid) return;

		if (this.isEdit) {
			this.atualizar();
		} else {
			this.adicionar();
		}

	}

	adicionar() {
		const params = this.requestTarefa;

		this.service.cadastrarTarefa(params).subscribe({
			next: (data: any) => {
				Swal.fire({
					text: `Tarefa cadastrada com sucesso!`,
					icon: 'success',
					showDenyButton: false,
					showCancelButton: false,
					showCloseButton: false,
					showConfirmButton: false,
				});

				this.enviarTarefa.emit();
				this.dialog.closeAll();

			},
			error: () => {
				this.dialog.closeAll();
			}
		});

	}

	atualizar() {
		const params = this.requestTarefa;
		this.service.atualizarTarefa(this.tarefa.cod_tarefa, params).subscribe(() => {
			Swal.fire({
				text: `Tarefa atualizada com sucesso!`,
				icon: 'success',
				showDenyButton: false,
				showCancelButton: false,
				showCloseButton: false,
				showConfirmButton: false,
			});

			this.enviarTarefa.emit();
			this.dialog.closeAll();

		});

	}
}

