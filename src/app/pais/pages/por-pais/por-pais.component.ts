import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ErrorCountry, Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino:string) {
    console.log(this.termino)
    this.termino = termino
    this.hayError = false;

    this.paisService.buscarPais( termino )
      .subscribe({
        next: (paises) => {
          console.log(paises)
          this.paises = paises;
          // si recibe ErrorCountry, evalua la condicion
          // let error = paises as ErrorCountry
          // if(error.status == 404) {
          //   this.hayError = true;
          //   this.paises = [];
          // }
        },
        error: (err) => {
          console.log(err);
          this.hayError = true;
          this.paises = [];
        }
      })
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
      .subscribe( paises => this.paisesSugeridos = paises.slice(0,5),
        (err) => this.paisesSugeridos = []
      );
  }

  buscarSugerido(termino:string) {
    this.buscar(termino);
  }

}
