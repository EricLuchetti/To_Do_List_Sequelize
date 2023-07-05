import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor (private authService: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token = this.authService.getToken();

		let jwtToken = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				token: token
			}
		});

		return next.handle(jwtToken);
	}

}
