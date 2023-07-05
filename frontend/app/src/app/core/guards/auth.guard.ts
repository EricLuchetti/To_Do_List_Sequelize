import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate {
	constructor (private authService: AuthService, private router: Router) {

	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		  const usuarioAutenticado = this.authService.usuarioAutenticado;

		  if(!usuarioAutenticado){
			this.authService.logout();
			this.router.navigate(['/auth']);
			return false;
		  }

		return true;
	  }
	}
