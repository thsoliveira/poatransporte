import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransportationsComponent } from './transportations/transportations.component';
import { ItineraryComponent } from './itinerary/itinerary.component';


const routes: Routes = [

   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'transportations/:type', component: TransportationsComponent },
   { path: 'itinerario/:id', component: ItineraryComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
