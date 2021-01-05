import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class HomeModule { }