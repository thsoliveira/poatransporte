import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { ItineraryCoordenates } from '../_models/trasportations.model';

@Component({
   selector: 'app-itinerary',
   templateUrl: './itinerary.component.html',
   styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

   public items: ItineraryCoordenates[];
   public dadosLinha: {};

   public isLoading: boolean;

   constructor(
      private _service: AppService,
      private _route: ActivatedRoute,
   ) { }

   ngOnInit() {
      this.isLoading = true;
      this.getItinerary(this._route.snapshot.params['id']);
   }

   getItinerary(id: string) {
      this.items = [];

      this._service.getRequest('?a=il&p=' + id).subscribe((data: any) => {
         this.dadosLinha = (({ codigo, nome, idlinha }) => ({ codigo, nome, idlinha }))(data);

         console.debug(this.dadosLinha);

         delete data.codigo;
         delete data.nome;
         delete data.idlinha;
         this.items = Object.values(data);
         const itemsTemp = [];

         Object.entries(this.items).forEach(([key, value]) => {
            this._service.getLocation(value.lat, value.lng).subscribe(data => {

               const obj = {};
               obj['lat'] = value.lat;
               obj['lng'] = value.lng;
               obj['place'] = (data.results[0].formatted_address);

               itemsTemp.push(obj);
            });
         });
         this.items = itemsTemp;
         setTimeout(() => {
            this.isLoading = false;
         }, 2000);
      });
   }

}
