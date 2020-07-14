import { container, injectable } from "tsyringe";

import { idAttr, messages } from '../utils/html_related';
import { domUtil } from '../utils/domUtil';
import { Storage } from './storage';
import { eventEmitter } from "../utils/events";
import { EventName } from "../constants/event.constants";

// TODO: リファクタリングする
@injectable()
export class Task {

  constructor(private readonly storage: Storage) {
    eventEmitter.on(EventName.SEARCH_INPUT, (e: Event) => {
      idAttr.tasks.innerHTML = "";
      const value = (e.target as HTMLInputElement).value;

      this.searchTask(value);
      idAttr.taskCount.textContent = this.storage.count;
    });
  }

  get priority(): number {
    const low: HTMLInputElement = domUtil.getElement("priority-low");
    const medium: HTMLInputElement = domUtil.getElement("priority-medium");
    const high: HTMLInputElement = domUtil.getElement("priority-high");

    if (low.checked) {
      return Number(low.value);
    }
    if (medium.checked) {
      return Number(medium.value);
    }
    if (high.checked) {
      return Number(high.value);
    }
    return 0;
  }

  /**
   * アプリケーションの作成
   */
  static createApplication() {
    return container.resolve(Task);
  }

  /**
   * タスクの作成
   * @param task
   */
  create(task: string) {
    if (task.length) {
      const html = this.taskTemplate(task);
      this.storage.save(task, html);
      idAttr.taskCount.textContent = this.storage.count;
      idAttr.tasks.innerHTML += html;
    }
  }

  /**
   * valueでタスクの検索を行う
   * @param value
   */
  searchTask(value: string): void {
    for (let key in localStorage) {
      const html: string | null = localStorage.getItem(key);

      if(html) {
        if(key.includes(value)) {
          idAttr.tasks.innerHTML += html
        }
      }
    }
  }

  getPriorityStr(priorityNumber: number): string {
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

  taskTemplate(inputValue: string): string {
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
