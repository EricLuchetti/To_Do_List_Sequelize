import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Login } from '../models/Login';
import { UsuarioLogado } from '../models/Usuario';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	url: string;
	isLoginSubject = new BehaviorSubject<boolean>(this.usuarioAutenticado);

	constructor (private http: HttpClient, private router: Router) {
		this.url = `${environment.url}/auth`;
	}

	get usuario() {
		const dataLoginJson = sessionStorage.getItem('dataLogin');
		return dataLoginJson ? JSON.parse(dataLoginJson) : {};
	}

	get usuarioAutenticado(): boolean {
		if (!sessionStorage.getItem('dataLogin')) return false;
		const token = this.usuario.token.length > 0;
		return token;
	}

	isLoggedIn(): Observable<any> {
		return this.isLoginSubject.asObservable();
	}


	getToken() {
		let dataLogin = sessionStorage.getItem('dataLogin');
		if (dataLogin) {
			let dataLoginParse = JSON.parse(dataLogin!);
			return dataLoginParse.token;
		} else {
			return '';
		}
	}

	login(params: Login) {
		return this.http.post(`${this.url}/login`, params).pipe(
			map((data: UsuarioLogado) => {
				sessionStorage.setItem('dataLogin', JSON.stringify(data));
				this.isLoginSubject.next(true);
				return data;
			})
		);
	}

	logout() {
		sessionStorage.clear();
		this.router.navigate([ '/auth' ]);
		this.isLoginSubject.next(false);
	}

	cadastrar(params: any) {
		return this.http.post(`${this.url}/cadastrar`, params).pipe(
			map((data: UsuarioLogado) => {
				return data;
			})
		);
	}

	enviarCodigo(params: any) {
		return this.http.post(`${this.url}/recuperar-senha`, params).pipe(
			map((data: any) => {
				return data;
			})
		);
	}

	validarCodigo(cod_recuperacao: any) {
		return this.http.get(`${this.url}/validar-codigo/${cod_recuperacao}`).pipe(
			map((data: any) => {
				sessionStorage.setItem(
					'codigoRecuperacao',
					JSON.stringify(cod_recuperacao)
				);
				return data;
			})
		);
	}

	alterarSenha(cod_recuperacao: any, params: any) {
		return this.http.put(`${this.url}/alterar-senha/${cod_recuperacao}`, params).pipe(
			map((data: any) => {
				sessionStorage.removeItem('codigoRecuperacao');
				return data;
			})
		);
	}

}
