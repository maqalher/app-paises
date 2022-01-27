import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ErrorCountry, Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

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
  }

}
