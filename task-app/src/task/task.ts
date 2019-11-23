import {
  idAttr,
  querySelector,
  noArgHtmls,
} from '../utils/html_related';
import UIComponents from '../components/UI/UIComponents';
import StorageFunc from './storage';

class Task {

  private storage: StorageFunc;
  private components: UIComponents;

  constructor() {
    this.storage = new StorageFunc();
    this.components = new UIComponents();
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
        idAttr.tasks.innerHTML = noArgHtmls.taskContentMsg;
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
      }
    }
    this.storage.count();
  }

  getPriority(): string {
    const low = this.components.convertInput(idAttr.low);
    const medium = this.components.convertInput(idAttr.medium);
    const high = this.components.convertInput(idAttr.high);

    if(low.checked) {
      return '<span>優先度: 低</span>';
    }
    if (medium.checked) {
      return '<span>優先度: 中</span>';
    }
    if (high.checked) {
      return '<span>優先度: 高</span>';
    }
    return '';
  }

  registeredValue(): string {
    let text = this.components.convertInput(idAttr.taskAdd).value;
    return text;
  }

  taskTemplate(inputValue: string): string {
    const template: string = `
    <li>
      <div>
        ${inputValue}
        <i class="far fa-trash-alt delete"></i>
      </div>
      <div>
        ${this.getPriority()}
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

