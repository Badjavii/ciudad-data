import { Singleton } from "../middlewares/SingletonMW";
import { GeoRepository } from "../repositories/GeoRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";

@Singleton
export class GeoService {
  private readonly repo: GeoRepository;

  constructor() {
    this.repo = new GeoRepository();
  }

  public async getCityData(cityName: string): Promise<any> {
    // const cityData = await this.repo.findCity(cityName);
    // if (cityData) return cityData;

    const data = await ApiManager.get<any>(
      `${process.env.GEONAMES_URL}/searchJSON?name=${cityName}&maxRows=1&username=${process.env.GEONAMES_USER}`
    );

    if (!data.geonames?.length) {
      throw new AppError(`City ${cityName} not found`, 404);
    }

    const cityData = {
      name: cityName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
      country: data.geonames[0].countryName,
    };

    // await this.repo.saveCity(cityData);
    return cityData;
  }


  public async getCountryPopulation(countryCode: string): Promise<any> {
  
      // const populationData = await this.repo.findPopulation(countryCode);
      // if (populationData) return populationData;
      const data = await ApiManager.get<any>(
          `${process.env.WORLD_BANK_URL}/country/${countryCode}/indicator/SP.POP.TOTL?format=json`
      );

      if (!data[1]?.length) {
          throw new AppError(`Country ${countryCode} not found`, 404);
      }

      // Busca el último año con valor válido
      const latest = data[1].find((d: any) => d.value !== null);
      const populationData = {
          country: countryCode,
          population: latest.value,
          year: latest.date,
      };
      
      // await this.repo.savePopulation(populationData);
      return populationData;
}

  public async saveReport(report: any): Promise<void> {
    // await this.repo.saveReport(report);
  }
}

