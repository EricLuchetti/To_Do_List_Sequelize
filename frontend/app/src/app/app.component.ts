import { Component, Output, OnInit, EventEmitter, ViewChild, Input } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements OnInit {
	@Output() tema: boolean = true;
	@Output() tipoTarefaParent = new EventEmitter<any>();
	tarefas: boolean = true;
	title = 'Lista de Tarefas';
	rootElement = document.documentElement;
	autenticated = this.authService.isLoggedIn();
	lightTheme = {
		'--cor-fundo': 'white',
		'--cor-letra': 'black'
	};
	darkTheme = {
		'--cor-fundo': 'rgba(0, 0, 0, 0.96)',
		'--cor-letra': 'white'
	};

	constructor (protected authService: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		this.setTema();
		this.setIcone();
		this.autenticated.subscribe();
	}

	logout() {
		Swal.fire({
			text: `Tem certeza que deseja sair?`,
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
				this.authService.logout();
			} else {
				Swal.close();
			}
		});
	}

	listar() {
		this.tarefas = true;
		this.router.navigate(['listar/tarefas']);
	}

	listarPrioridades() {
		this.tarefas = false;
		this.router.navigate(['listar/prioridades']);
	}

	setIcone() {
		let temaSessao = localStorage.getItem('tema');
		if (temaSessao == 'true') {
			this.tema = true;
		} else {
			this.tema = false;
		}
	}

	setTema() {
		let conteudoArmazenado = localStorage.getItem("tema");

		if (!conteudoArmazenado) {
			localStorage.setItem('tema', 'true');
			this.mudarScss(this.lightTheme);
		} else if (conteudoArmazenado == 'true') {
			this.mudarScss(this.lightTheme);
		} else if (conteudoArmazenado == 'false') {
			this.mudarScss(this.darkTheme);
		}
	}

	retornarTema(): string {

		if (this.tema) {
			return "light_mode";
		} else {
			return "dark_mode";
		}
	}

	perfilUsuario() {
		this.router.navigateByUrl('/usuario')
	}

	mudarTema() {
		this.tema = !this.tema;

		this.tema ? this.mudarScss(this.lightTheme) : this.mudarScss(this.darkTheme);
		localStorage.setItem('tema', JSON.stringify(this.tema));
	}

	mudarScss(tema: any) {
		for (let prop in tema) {
			this.setProperty(prop, tema[ prop ]);
		}
	}

	setProperty(property: any, value: any) {
		this.rootElement.style.setProperty(property, value);
	}
}
