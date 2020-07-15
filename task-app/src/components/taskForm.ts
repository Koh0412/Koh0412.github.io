import { domUtil } from "../utils/domUtil";
import { injectable } from "tsyringe";
import { Storage } from "../services/storage";
import { idAttr, messages } from "../utils/html_related";

/** タスクのフォームのコンポネント */
@injectable()
export class TaskForm {
  private input: HTMLInputElement = domUtil.getElement("task-add");
  private form: HTMLFormElement = domUtil.getElement("form");

  constructor(private readonly storageService: Storage) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submittedTask = this.input.value.trim();
      this.create(submittedTask);
      this.input.value = "";
    });
  }

  private get priority(): number {
    const low: HTMLInputElement = domUtil.getElement("priority-low");
    const medium: HTMLInputElement = domUtil.getElement("priority-medium");
    const high: HTMLInputElement = domUtil.getElement("priority-high");

    if (low.checked) {
      return parseInt(low.value, 10);
    }
    if (medium.checked) {
      return parseInt(medium.value, 10);
    }
    if (high.checked) {
      return parseInt(high.value, 10);
    }
    return 0;
  }

  /**
   * タスクの作成
   * @param task
   */
  private create(task: string) {
    if (task.length) {
      const html = this.template(task);
      this.storageService.save(task, html);
      idAttr.taskCount.textContent = this.storageService.count;
      idAttr.tasks.innerHTML += html;
    }
  }

  private getPriorityStr(priorityNumber: number): string {
    switch (priorityNumber) {
      case 1:
        return messages.priority.low;
        break;
      case 2:
        return messages.priority.medium;
        break;
      case 3:
        return messages.priority.high;
        break;
      default:
        return '';
        break;
    }
  }

  /**
   * テンプレート
   * @param inputValue
   */
  private template(inputValue: string): string {
    const priority: string = this.getPriorityStr(this.priority);
    const priorityClass: string = domUtil.cardColorClassName(this.priority);

    const template: string = `
    <li class="${priorityClass}">
      <div class="task-title">
        ${inputValue}
        <i class="far fa-trash-alt delete"></i>
      </div>
      <div class="task-property">
        ${priority}
      </div>
    </li>`;
    return template;
  }
}