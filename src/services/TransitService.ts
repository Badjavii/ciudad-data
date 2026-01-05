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

    const data = await ApiManager.get<any>(
      `https://api.transitdata.com/routes?city=${cityName}`
    );

    if (!data.routes?.length) {
      throw new AppError(`No routes found for city ${cityName}`, 404);
    }

    const routes = data.routes.map((r: any) => ({
      id: r.id,
      name: r.name,
      stops: r.stops,
    }));

    // await this.repo.saveRoutes(cityName, routes);
    return routes;
  }

  public async getETA(stopId: string): Promise<any> {
    // const eta = await this.repo.findETA(stopId);
    // if (eta) return eta;

    const data = await ApiManager.get<any>(
      `https://api.transitdata.com/eta?stop_id=${stopId}`
    );

    if (!data.eta) {
      throw new AppError(`No ETA found for stop ${stopId}`, 404);
    }

    const eta = { stopId, arrivalTime: data.eta };

    // await this.repo.saveETA(eta);
    return eta;
  }

  public async reportIncident(incident: any): Promise<void> {
    // await this.repo.saveIncident(incident);
  }
}
