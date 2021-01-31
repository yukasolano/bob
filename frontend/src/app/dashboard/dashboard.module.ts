import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BookTableComponent } from './book-table/book-table.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
    declarations: [
        DashboardComponent,
        BookTableComponent,
        StatisticsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        DecimalPipe
    ]
})
export class DashboardModule { }