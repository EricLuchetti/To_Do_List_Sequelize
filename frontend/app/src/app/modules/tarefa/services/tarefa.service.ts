import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Tarefa } from '../models/Tarefa';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    url: string;

    constructor (private http: HttpClient) {
        this.url = `${environment.url}`;
    }

    listarTarefas(): Observable<Tarefa[]> {
        return this.http
            .get<Tarefa[]>(`${this.url}/listar`)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    listarPrioridades(): Observable<Tarefa[]> {
        return this.http
            .get<Tarefa[]>(`${this.url}/listar/prioridades`)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    detalharTarefas(tarefa: string): Observable<Tarefa[]> {
        return this.http
            .post<Tarefa>(`${this.url}/detalhar`, { tarefa })
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    detalharPrioridades(tarefa: string): Observable<Tarefa[]> {
        return this.http
            .post<Tarefa>(`${this.url}/detalhar/prioridades`, { tarefa })
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    cadastrarTarefa(params: Object): Observable<Tarefa> {
        return this.http
            .post<Tarefa>(`${this.url}/cadastrar`, params)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    atualizarTarefa(cod_tarefa: number, params: Object): Observable<Tarefa> {
        return this.http
            .put<Tarefa>(`${this.url}/tarefa/${cod_tarefa}`, params)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    }

    excluirTarefa(cod_tarefa: number): Observable<Tarefa> {
        return this.http
            .delete<Tarefa>(`${this.url}/tarefa/${cod_tarefa}`)
            .pipe(
                map((data: any) => {
                    return data;
                })
            );
    };

    mudarPrioridade(tarefa: Tarefa) {
        tarefa.prioridade = !tarefa.prioridade;
        return this.atualizarTarefa(tarefa.cod_tarefa, tarefa);
    }

    concluir(tarefa: Tarefa) {
        tarefa.concluida = !tarefa.concluida;
        return this.atualizarTarefa(tarefa.cod_tarefa, tarefa);
    }
}
