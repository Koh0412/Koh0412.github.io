import { container, injectable } from "tsyringe";

import { idAttr, querySelector, messages } from '../utils/html_related';
import { domUtil } from '../utils/domUtil';
import { Storage } from './storage';

interface searchEvent {
  isSearch: boolean,
  event: Event | null,
}

// TODO: リファクタリングする
@injectable()
export class Task {

  private priorityArray: Array<number> = [];

  constructor(private readonly storage: Storage) {

    idAttr.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitedTask: string = this.registeredValue.trim();
      this.createTaskList(submitedTask);
    });

    idAttr.setting.addEventListener('click', this.storage.clear.bind(this));
    idAttr.tasks.addEventListener('click', (e) => this.storage.remove(e));

    this.getItemListIn(idAttr.tasks);


    (querySelector.ripple as HTMLElement).addEventListener('mousedown', (e) => domUtil.ripple(e));

    idAttr.searchForm.addEventListener('input', e => {
      idAttr.tasks.innerHTML = '';
      this.getItemListIn(idAttr.tasks, {isSearch: true, event: e});
    });
  }

  get registeredValue(): string {
    let text = domUtil.convertInput(idAttr.taskAdd).value;
    return text;
  }

  get priority(): number {
    const low = domUtil.convertInput(idAttr.low);
    const medium = domUtil.convertInput(idAttr.medium);
    const high = domUtil.convertInput(idAttr.high);

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

  clearInForm(task: string): void {
    idAttr.tasks.innerHTML += this.taskTemplate(task);
    domUtil.convertInput(idAttr.taskAdd).value = '';
  }

  /**
   * タスクの作成
   * @param task
   */
  createTaskList(task: string) {
    if (task.length) {
      const html = this.taskTemplate(task);
      this.storage.save(task, html);
      this.clearInForm(task);
      idAttr.taskCount.textContent = this.storage.count;
    }
  }

  getItemListIn(tasks: HTMLElement, search: searchEvent = {isSearch: false, event: null}): void {
    for (let key in localStorage) {
      const html: string | null = localStorage.getItem(key);
      if (html && !search.isSearch && !search.event) {
        tasks.innerHTML += localStorage.getItem(key);
      }

      if(html && search.isSearch && search.event) {
        idAttr.searchForm.onsubmit = () => {
          return false;
        }
        const searchValue = (search.event.target as HTMLInputElement).value;
        if(key.includes(searchValue)) {
          tasks.innerHTML += localStorage.getItem(key);
        }
      }
    }
    idAttr.taskCount.textContent = this.storage.count;
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
