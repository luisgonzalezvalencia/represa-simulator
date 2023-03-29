import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador-accion',
  templateUrl: './simulador-accion.component.html',
  styleUrls: ['./simulador-accion.component.scss']
})
export class SimuladorAccionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  iniciarSimulacion() {
    console.log("Simulacion iniciada");
  }

}
