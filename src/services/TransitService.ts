import { Singleton } from "../middlewares/SingletonMW";
import { TransitRepository } from "../repositories/TransitRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";

@Singleton
export class TransitService {
  private readonly repo: TransitRepository;

  constructor() {
    this.repo = new TransitRepository();
  }

  public async getRoutes(cityName: string): Promise<any[]> {
    // const routes = await this.repo.findRoutes(cityName);
    // if (routes?.length) return routes;

    let data: any;
    let routes: any;

    if (cityName.toUpperCase() === "NYC"){
        data = await ApiManager.get<any>(
            `${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&VehicleMonitoringDetailLevel=calls`
        );

        console.log(JSON.stringify(data, null, 2));

        const activities = data.Siri?.ServiceDelivery?.VehicleMonitoringDelivery?.VehicleActivity || [];
        routes = activities.map((act: any) => ({
            lineRef: act.MonitoredVehicleJourney.LineRef,
            direction: act.MonitoredVehicleJourney.DirectionRef,
            stop: act.MonitoredVehicleJourney.MonitoredCall?.StopPointName,
            expectedArrival: act.MonitoredVehicleJourney.MonitoredCall?.ExpectedArrivalTime,
        }));

    } else if (cityName.toUpperCase() === "LONDON"){
        data = await ApiManager.get<any>(
            `${process.env.TFL_API_URL}/Line/Mode/bus?app_key=${process.env.TFL_API_KEY}`
        );

        routes = data.map((line: any) => ({
            id: line.id,
            name: line.name,
            mode: line.modeName
        }));
    } else {
        throw new AppError(`No routes available for city ${cityName}`, 404);
    }

    // await this.repo.saveRoutes(cityName, routes);
    return routes;
  }

  public async getETA(stopId: string): Promise<any> {
    // const eta = await this.repo.findETA(stopId);
    // if (eta) return eta;

    const data = await ApiManager.get<any>(
        `${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&MonitoringRef=${stopId}`
    );

    if (!data) {
      throw new AppError(`No ETA found for stop ${stopId}`, 404);
    }

    const calls = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];
    const etaList = calls.map((visit: any) => ({
        line: visit.MonitoredVehicleJourney.LineRef,
        busId: visit.MonitoredVehicleJourney.VehicleRef,
        stop: visit.MonitoredVehicleJourney.MonitoredCall.StopPointName,
        expectedArrival: visit.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime,
        distance: visit.MonitoredVehicleJourney.MonitoredCall.Extensions?.Distances?.PresentableDistance,
        location: visit.MonitoredVehicleJourney.VehicleLocation,
    }));

    const eta = { stopId, eta: etaList };

    // await this.repo.saveETA(eta);
    return eta;
  }

  public async reportIncident(incident: any): Promise<void> {
    // await this.repo.saveIncident(incident);
  }
}
