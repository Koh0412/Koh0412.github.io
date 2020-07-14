import { domUtil } from "../utils/domUtil";
import { Task } from "../services/task";
import { injectable } from "tsyringe";

/** タスクのフォームのコンポネント */
@injectable()
export class TaskForm {
  private input: HTMLInputElement = domUtil.getElement("task-add");
  private form: HTMLFormElement = domUtil.getElement("form");

  constructor(private readonly taskService: Task) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submittedTask = this.input.value.trim();
      this.taskService.create(submittedTask);
      this.input.value = "";
    });
  }
}