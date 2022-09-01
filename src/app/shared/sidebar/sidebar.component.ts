import { Component, Input } from '@angular/core';
import { GiftsService } from '../../gifs/services/gifts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){
   
    return this.giftService.historial;
    
  }

  constructor(private giftService: GiftsService) { 

  }

  buscar(query: string){
    this.giftService.buscarGifts(query);
  }

}
