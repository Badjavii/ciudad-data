/**
 * @file index.ts
 * @description Entry point of the CiudadData API.
 * Initializes the App class and starts the server.
 */

import { App } from "./App";

const app = new App();

 /** 
  * Start listening on the configured port. 
  * Logs startup information and Swagger docs URL. 
  */
app.listen();
console.log("\n\n");
