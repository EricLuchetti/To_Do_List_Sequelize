import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import { RodapeComponent } from './components/rodape/rodape.component';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module';

@NgModule({
    declarations: [
        RodapeComponent
    ],
    imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatChipsModule,
		AngularMaterialModule
    ],
    exports: [
		FormsModule,
		ReactiveFormsModule,
		MatChipsModule,
		AngularMaterialModule,
		RodapeComponent
    ]
})
export class SharedModule { }
