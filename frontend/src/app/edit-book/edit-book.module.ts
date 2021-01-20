import { NgModule } from '@angular/core';
import { EditBookComponent } from './edit-book.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EditBookComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule
    ]
})
export class EditBookModule { }