import "reflect-metadata";
import { Task } from './api/task';

function boot() {
  Task.createApplication();
}

boot();