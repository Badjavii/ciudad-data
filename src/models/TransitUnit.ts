export class TransitUnit {
  line: string;            // LineRef (ej: MTA NYCT_Q82)
  day: string;             // DataFrameRef (ej: 2026-01-06)
  eta: string;             // ExpectedArrivalTime
  stopId: string;          // StopPointRef
  stopName: string;        // StopPointName
  vehicleId: string;       // VehicleRef
  location: { lat: number; lng: number }; // VehicleLocation
  distance: string;        // PresentableDistance (ej: "2.2 miles away")

  constructor(line: string, day: string, eta: string, stopId: string, stopName: string, vehicleId: string, lat: number, lng: number, distance: string) {
    this.line = line;
    this.day = day;
    this.eta = eta;
    this.stopId = stopId;
    this.stopName = stopName;
    this.vehicleId = vehicleId;
    this.location = { lat, lng };
    this.distance = distance;
  }
}

