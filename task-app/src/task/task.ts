import {
  idAttr,
  querySelector,
  messages,
} from '../utils/html_related';
import UIComponents from '../components/UI/UIComponents';
import StorageFunc from './storage';

class Task {

  private storage: StorageFunc;
  private components: UIComponents;
  private priorityArray: Array<number>;

  constructor() {
    this.storage = new StorageFunc();
    this.components = new UIComponents();
    this.priorityArray = [];
  }

  app() {
    idAttr.form.addEventListener('submit', e => {
      e.preventDefault();
      const submitedTask: string = this.registeredValue().trim();
      this.createTaskList(submitedTask);
    });

    idAttr.setting.addEventListener('click', () => {
      this.storage.clear();
    });

    window.onload = () => {
      this.getItemListIn(idAttr.tasks);
      if(localStorage.length === 0) {
        idAttr.tasks.innerHTML = messages.noTask;
      }
    }

    idAttr.tasks.addEventListener('click', e => {
      this.storage.remove(e);
    });

    (querySelector.ripple as HTMLElement).addEventListener('mousedown', e => {
      this.components.ripple(e);
    });
  }

  clearInForm(task: string): void {
    idAttr.tasks.innerHTML += this.taskTemplate(task);
    this.components.convertInput(idAttr.taskAdd).value = '';
  }

  createTaskList(task: string) {
    if (task.length) {
      if (localStorage.length === 0) {
        idAttr.tasks.innerHTML = '';
      }
      const html = this.taskTemplate(task);

      this.storage.save(task, html);
      this.clearInForm(task);
      this.storage.count();
    }
  }

  getItemListIn(tasks: HTMLElement): void {
    for (let key in localStorage) {
      const html: string | null = localStorage.getItem(key);
      if (html) {
        tasks.innerHTML += localStorage.getItem(key);
        console.log(html);
      }
    }
    this.storage.count();
  }

  priority(): number {
    const low = this.components.convertInput(idAttr.low);
    const medium = this.components.convertInput(idAttr.medium);
    const high = this.components.convertInput(idAttr.high);

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

  registeredValue(): string {
    let text = this.components.convertInput(idAttr.taskAdd).value;
    return text;
  }

  taskTemplate(inputValue: string): string {
    const priority: string = this.getPriorityStr(this.priority());
    const priorityClass: string = this.components.cardColorClassName(this.priority());

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

export { Task }

interface TaskSigneture {
  new (): Task
}

export default () => {
  const task: TaskSigneture = Task;
  const insTask: Task = new task();
  return insTask;
}

