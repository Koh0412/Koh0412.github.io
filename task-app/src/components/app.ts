import { container, injectable } from "tsyringe";
import { Header } from "./header";
import { TaskForm } from "./taskForm";
import { TaskList } from "./taskList";
import { domUtil } from "../utils/domUtil";

@injectable()
export class App {

  constructor(
    private readonly header: Header,
    private readonly taskForm: TaskForm,
    private readonly taskList: TaskList,
  ) {
    const rippleElement: HTMLElement | null = document.querySelector(".ripple-element");
    rippleElement?.addEventListener("mousedown", (e) => domUtil.applyRipple(e));
  }

  static createApplication() {
    return container.resolve(App);
  }
}