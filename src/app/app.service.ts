import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TransportationLines } from './_models/trasportations.model';

@Injectable({
   providedIn: 'root'
})
export class AppService {

   public poatransApi = 'http://www.poatransporte.com.br/php/facades/process.php';
   public googleApi = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCKgaP46yTGh7aH7K-GSj0l3cuUG_l9CKU';

   // private apiKey = 'AIzaSyCKgaP46yTGh7aH7K-GSj0l3cuUG_l9CKU';

   constructor(private _http: HttpClient) { }

   getRequest(params?: string): Observable<any> {
      let url = this.poatransApi;

      if (params !== undefined) {
         url = `${this.poatransApi}/${params}`;
      }

      return this._http.get(url).pipe(
         tap(
            data => console.debug(data)
         ),
         catchError(
            err => {
               return new Observable<any>();
            }
         )
      );
   }

   getLocation(lat: string, lng: string): Observable<any> {
      let url = this.googleApi;

      if (lat !== undefined && lng !== undefined) {
         url = `${this.googleApi}&latlng=${lat},${lng}`;
      }

      return this._http.get(url).pipe(
         catchError(
            err => {
               return new Observable<any>();
            }
         )
      );
   }
}
