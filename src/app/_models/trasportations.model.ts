export class TransportationLines {
   codigo: string;
   id: string;
   nome: string;
}

export class ItineraryCoordenates{
   lat: string;
   lng: string;
}

export class Itinerary{
   coordenates: ItineraryCoordenates[];
   codigo: string;
   idlinha: string;
   nome: string;
}