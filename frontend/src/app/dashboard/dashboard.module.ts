import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BookTableComponent } from './book-table/book-table.component';

@NgModule({
    declarations: [
        DashboardComponent,
        BookTableComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class DashboardModule { }