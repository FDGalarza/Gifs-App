import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerachGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GiftsService {

    private apiKey    : string          = 'b0Z07ZrL2vtXUj9AjBLPesYncJZiyfHx';
    private url       : string          = 'https://api.giphy.com/v1/gifs';
    private _historial: string[]        = [];

    public resultados : Gif[]           = [];

    get historial(){
      /**
       * [...this._historial]->rompe la relación de los
       * elementos del array y se convierte en un nuevo array
      */
      return [...this._historial];
    }

    constructor(private http: HttpClient){
        /**
         * Se muestra el local storage
        */
         this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
         this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }

    buscarGifts(query:  string){
        
      query = query.trim().toLocaleLowerCase();
        /**
         * Valida que no se repitan elementos en el array
         */
        if(!this._historial.includes(query)){
            // unshift inserta un elemento al final del array
            this._historial.unshift(query);
            /**
             * restringe el numero de elementos del array, hasta 10,
             * quita el primero siempre
            */
            this._historial = this._historial.splice(0, 10);
            /**
             * Se guarda en el localStorage del navegador
             */
            localStorage.setItem('historial', JSON.stringify(this._historial));
            
        }
        
        /**
         * Se realiza petición HTTP
         */
        const params = new HttpParams()
                              .set('api_key', this.apiKey)
                              .set('limit', '10')
                              .set('q', query);
        
        this.http.get<SerachGifsResponse>(`${ this.url}/search`, {params})
            .subscribe((resp ) =>{
                console.log(resp.data);
               this.resultados = resp.data;
               localStorage.setItem('resultados', JSON.stringify(this.resultados));
            });

            
    }

    
}
