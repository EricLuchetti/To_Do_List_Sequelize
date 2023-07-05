import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

	constructor (
		private toastrService: ToastrService
	) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				let errorMessage = '';
				if (err.error instanceof ErrorEvent) {
					errorMessage = `Error: ${err.error?.message}`;
				} else {
					errorMessage = `Error Code: ${err.status},  Message: ${err.error?.message}`;
				}

				this.toastrService.error(this.convertMessageError(err.error?.message), 'Erro!', {
					timeOut: 3000,
				});

				return throwError(() => new Error(errorMessage));
			})
		);
	}

	convertMessageError(responseErrorMessage: any): any {
		let messageError = responseErrorMessage;

		if (!(responseErrorMessage instanceof Array)) return messageError;

		let listErrors: any = [];

		messageError.forEach((itemError: any) => {
			listErrors.push(itemError);
		});

		return listErrors;
	}
}
