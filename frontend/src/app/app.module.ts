import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EditBookModule } from './edit-book/edit-book.module';
import { InterceptorModule } from './core/interceptors/interceptor.module';
import { SearchBookModule } from './dashboard/search-book/search-book.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    HomeModule,
    DashboardModule,
    EditBookModule,
    InterceptorModule,
    SearchBookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
