import "reflect-metadata";
import { App } from "./components/app";

function boot() {
  App.createApplication();
}

boot();