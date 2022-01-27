import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino:string) {
    console.log(this.termino)
    this.termino = termino
    this.hayError = false;

    this.paisService.buscarCapital( termino )
      .subscribe({
        next: (paises) => {
          console.log(paises)
          this.paises = paises;

        },
        error: (err) => {
          console.log(err);
          this.hayError = true;
          this.paises = [];
        }
      })
  }

}
