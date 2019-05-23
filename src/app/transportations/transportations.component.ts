import { Component } from '@angular/core';
import { TransportationLines } from '../_models/trasportations.model';
import { AppService } from '../app.service';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
   selector: 'app-transportations',
   templateUrl: './transportations.component.html',
   styleUrls: ['./transportations.component.scss']
})
export class TransportationsComponent{

   public items: TransportationLines[];
   public isLoading: boolean;

   constructor(
      private _service: AppService,
      private _route: Router,
   ) {
      _route.events.pipe(
         filter(event => event instanceof ActivationEnd)  
       ).subscribe((event: ActivationEnd) => {
         this.isLoading = true;
         this.getLines(event.snapshot.params['type']);
       });
   }

   getLines(type: string) {
      // ?a=nc&p=%&t=o
      // ?a=nc&p=%&t=l
      this.items = [];

      if(type !== undefined && type !== null)  type = type.charAt(0);

      this._service.getRequest('?a=nc&p=%&t=' + type).subscribe((data: TransportationLines[]) => {
         this.items = data;

         setTimeout(() => {
            this.isLoading = false;
         }, 2000);
      });
   }
}
