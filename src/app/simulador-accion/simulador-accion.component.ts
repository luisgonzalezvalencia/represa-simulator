import { Component, OnInit } from '@angular/core';

//interfaces necesarias para definir los objetos
export interface Compuerta {
  compuerta: number;
  nivel: number;
  abierto: boolean;
}

export interface ResultadoSimulacion {
  iteracion: number;
  valorFuncion: number;
  variacionMarca: number;
  estadoCompuertas: Compuerta[];
  nivelActual: number;
  alertaRojo: boolean;
}

@Component({
  selector: 'app-simulador-accion',
  templateUrl: './simulador-accion.component.html',
  styleUrls: ['./simulador-accion.component.scss']
})
export class SimuladorAccionComponent implements OnInit {

  //variables iniciales
  nivelInicial: number = 30; //30 litros
  cantidadIteraciones: number = 10;
  simulacionIniciada: boolean = false;
  alertaRojo: boolean = false;
  contadorAlertasRojas: number = 0;

  iteracionActual: number = 0;

  semillaActual: number = 40;

  private maximoRepresa: number = 45; //45 litros es la maxima capacidad
  private nivelActualRepresa: number = 0;
  private iteraciones: number = 0;

  //aqui esta definida la tabla de la funcion con sus valores minimos y maximos
  //y la marca de incremento/decremento de litros
  private tablaFuncion = [
    {
      marca: -3,
      valorMin: 0.0001,
      valorMax: 0.0372
    },
    {
      marca: -2,
      valorMin: 0.0373,
      valorMax: 0.2507
    },
    {
      marca: -1,
      valorMin: 0.2508,
      valorMax: 0.4367
    },
    {
      marca: 0,
      valorMin: 0.4368,
      valorMax: 0.5642
    },
    {
      marca: 1,
      valorMin: 0.5643,
      valorMax: 0.7493
    },
    {
      marca: 2,
      valorMin: 0.7494,
      valorMax: 0.9628
    },
    {
      marca: 3,
      valorMin: 0.9628,
      valorMax: 1
    }
  ];

  //compuertas de evacuacion con niveles y estado cerrado por default
  private compuertasEvacuacion: Compuerta[] = [
    {
      compuerta: 1,
      nivel: 15,
      abierto: false
    },
    {
      compuerta: 2,
      nivel: 25,
      abierto: false
    },
    {
      compuerta: 3,
      nivel: 32,
      abierto: false
    },
    {
      compuerta: 4,
      nivel: 40,
      abierto: false
    }
  ];

  public resultadosSimulacion: ResultadoSimulacion[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  iniciarSimulacion() {
    console.log("Simulacion iniciada");
    //test semillas
    // this.fSemilla(Math.random() * 100000, Math.random() * 100000, 100, 30);

    //seteamos el nivel del agua inicial y el estado de las compuertas en ese nivel.
    this.registrarEstadoInicial();

    //luego por cada dia (iteracion) generamos la simulacion
    for (let i = 0; i < this.cantidadIteraciones; i++) {
      this.iteracionActual += 1;
      this.simular();
    }

    //al finalizar las iteraciones, seteamos el nivel inicial con el ultimo
    //nivel generado con las iteraciones
    this.nivelInicial = this.nivelActualRepresa;
  }

  registrarEstadoInicial() {
    //ingresamos el nivel actual del agua y validamos el estado inicial de las compuertas
    if (!this.simulacionIniciada) {
      this.simulacionIniciada = true;
      this.nivelActualRepresa = this.nivelInicial;
      this.validarNivelCompuertas();
      this.agregarResultado(0, 0);
    }
  }

  simular() {
    //obtener un numero random entre 0 y 1 de 4 decimales
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    let valorFuncion = parseFloat((array[0] / (Math.pow(2, 32) - 1)).toFixed(4));

    // let valorFuncion = parseFloat((Math.random()).toFixed(4));
    let variacionMarca = this.tablaFuncion.find(tf => valorFuncion >= tf.valorMin && valorFuncion <= tf.valorMax)?.marca;
    if (variacionMarca != undefined) {
      this.nivelActualRepresa += variacionMarca;
      this.validarNivelCompuertas();
      this.agregarResultado(valorFuncion, variacionMarca);
    } else {
      console.log("Error al buscar un valor de marca");
      console.log(valorFuncion);
    }
  }

  validarNivelCompuertas() {
    //si el nivel nos da negativo, lo igualamos a 0 que es el nivel minimo
    if (this.nivelActualRepresa < 0) {
      this.nivelActualRepresa = 0;
    }

    //por cada compuerta verificamos si sobrepaso el nivel del agua requerido y lo abrimos o cerramos
    for (let index = 0; index < this.compuertasEvacuacion.length; index++) {
      let compuerta = { ...this.compuertasEvacuacion[index] };
      if (compuerta.nivel <= this.nivelActualRepresa) {
        compuerta.abierto = true;
      } else {
        compuerta.abierto = false;
      }
      this.compuertasEvacuacion[index] = compuerta;
    }

    //si se supera la capacidad maxima de la represa,
    // enciendo alerta roja y sumo contador de alertas. Sino, seteo en falso la alerta roja
    if (this.nivelActualRepresa > this.maximoRepresa) {
      this.alertaRojo = true;
      this.contadorAlertasRojas += 1;
    } else {
      this.alertaRojo = false;
    }
  }

  agregarResultado(valorFuncion: number, variacionMarca: number) {
    let copyCompuertas = [...this.compuertasEvacuacion];
    this.resultadosSimulacion.push(
      {
        estadoCompuertas: copyCompuertas,
        iteracion: this.iteracionActual,
        valorFuncion: valorFuncion,
        variacionMarca: variacionMarca,
        nivelActual: this.nivelActualRepresa,
        alertaRojo: this.alertaRojo
      }
    );
  }

  limpiarSimulacion() {
    this.nivelInicial = 30;
    this.cantidadIteraciones = 10;
    this.simulacionIniciada = false;
    this.alertaRojo = false;
    this.contadorAlertasRojas = 0;
    this.iteracionActual = 0;
    this.nivelActualRepresa = 0;
    this.iteraciones = 0;
    this.resultadosSimulacion = [];
  }

  fSemilla(a: number, b: number, m: number, n: number) {
    let arraySemillas: number[] = [];
    //n las iteraciones
    for (var i = 0; i < n; i++) {
      let x = this.semillaActual;
      this.semillaActual = parseFloat(((((a * x) + b) % m) / 100).toFixed(4));
      arraySemillas.push(this.semillaActual);
    }
    console.log(arraySemillas);
  }

}
