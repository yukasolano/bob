import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule { }