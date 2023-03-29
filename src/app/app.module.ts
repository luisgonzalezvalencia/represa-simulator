import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistribucionDiariaComponent } from './distribucion-diaria/distribucion-diaria.component';
import { HomeComponent } from './home/home.component';
import { SimuladorAccionComponent } from './simulador-accion/simulador-accion.component';

@NgModule({
  declarations: [
    AppComponent,
    DistribucionDiariaComponent,
    HomeComponent,
    SimuladorAccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
