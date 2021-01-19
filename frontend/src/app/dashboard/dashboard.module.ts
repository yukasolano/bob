import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BookTableComponent } from './book-table/book-table.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent,
        BookTableComponent,
        EditBookComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule
    ]
})
export class DashboardModule { }