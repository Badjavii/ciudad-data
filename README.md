# Ciudad Data: Special Programming Topics Project

## About this Project

**Ciudad Data** is a REST API designed as a public data gateway.  
Its main goal is to centralize and standardize information from multiple international open data sources, providing unified access to geographic, transportation, and statistical data.

This project addresses the challenge of dispersed public information by offering a single access point for data consumption and analysis.

## Technologies

- **Backend**: Node.js with TypeScript  
- **Database**: MongoDB with Mongoose  
- **Testing**: Jest & Supertest (Test-Driven Development)  
- **Documentation**: Swagger (OpenAPI)  
- **Version Control**: GitFlow methodology  
- **Configuration**: Environment variables (.env) for sensitive data management  

## Key Endpoints

### Geographic and Urban Module (`/geo`)
- `GET /geo/city/:city` → Retrieve latitude, longitude, and geographic data of a city (GeoNames API).  
- `GET /geo/population/:country` → Get population and demographic data of a country (World Bank API).  
- `POST /geo/report` → Save a citizen report (e.g., local incident) in the database.  

### Transportation Module (`/transit`)
- `GET /transit/routes/:city` → List all public transport routes in a given city.  
- `GET /transit/eta?stop_id=[id]` → Get estimated arrival time (ETA) for a specific stop.  
- `POST /transit/incident` → Report transport incidents (delays, failures) stored in the database.

## Team 

This software is proudly designed by:

- Cristian De Sousa.
- Edixon Gonzales.
- Javier Otero (aka badjavii).
