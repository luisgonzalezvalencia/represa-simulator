import { Component, Input, OnInit } from '@angular/core';
import { ResultadoSimulacion } from '../simulador-accion/simulador-accion.component';

@Component({
  selector: 'app-resultados-simulacion',
  templateUrl: './resultados-simulacion.component.html',
  styleUrls: ['./resultados-simulacion.component.scss']
})
export class ResultadosSimulacionComponent implements OnInit {

  @Input()
  resultados: ResultadoSimulacion[] = [];

  public soloAlertas: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cantidadAlertasRojas() {
    return this.resultados.filter(r => r.alertaRojo == true).length;
  }


  mostrarSoloAlertas() {
    this.soloAlertas = !this.soloAlertas;
  }


}
