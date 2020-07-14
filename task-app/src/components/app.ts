import { container, injectable } from "tsyringe";
import { Header } from "./header";
import { TaskForm } from "./taskForm";
import { TaskList } from "./taskList";

@injectable()
export class App {

  constructor(
    private readonly header: Header,
    private readonly taskForm: TaskForm,
    private readonly taskList: TaskList,
  ) {}

  static createApplication() {
    return container.resolve(App);
  }
}