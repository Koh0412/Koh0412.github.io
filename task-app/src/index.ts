import "reflect-metadata";
import { Task } from './services/task';
import { App } from "./components/app";

function boot() {
  Task.createApplication();
  App.createApplication();
}

boot();