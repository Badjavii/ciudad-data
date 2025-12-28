import { App } from "./App";
import { getWeaver } from "aspectjs";
import { SingletonMW } from "./middlewares/SingletonMW";

getWeaver().enable(new SingletonMW());

const app = new App();

app.listen();
