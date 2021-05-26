import { NgModule } from '@angular/core';
import { SearchBookComponent } from './search-book.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SearchBookComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule
    ]
})
export class SearchBookModule { }