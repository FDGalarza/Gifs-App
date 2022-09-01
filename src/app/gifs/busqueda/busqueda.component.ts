import { Component, ElementRef, ViewChild } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  //captura un elemento html con todos sus atributos
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gitsService: GiftsService){

  }
  buscar(){
      
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return;
    }
    this.gitsService.buscarGifts(valor);
    console.log(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
