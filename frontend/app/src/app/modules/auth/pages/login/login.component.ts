import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	hide = true;

	constructor (
		private authService: AuthService,
		private router: Router
	) {
		this.initForm();
	}

	ngOnInit() {
	}

	initForm() {
		this.form = new FormGroup({
			login: new FormControl(null, [ Validators.required ]),
			senha: new FormControl(null, [ Validators.required ]),
		});
	}

	async login() {
		if (!this.form.valid) return;
		const params = this.form.getRawValue();
		this.authService.login(params).subscribe({
			next: (data: any) => {
				this.router.navigateByUrl('listar');
			},
			error: (error: any) => {
				console.log(error)
			}
		});
	}

}
