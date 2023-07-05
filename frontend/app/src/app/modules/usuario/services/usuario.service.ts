import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	url: string;

	constructor (private http: HttpClient) {
		this.url = `${environment.url}/usuario`;
	}

	detalhar(): Observable<Usuario> {
		return this.http
			.get<Usuario>(`${this.url}`)
			.pipe(
				map((data: any) => {
					return data;
				})
			);
	}

	atualizar(params: Object): Observable<Usuario> {
		return this.http.put<Usuario>(`${this.url}`, params)
			.pipe(map((data: any) => {
				return data;
			}));
	}
}
