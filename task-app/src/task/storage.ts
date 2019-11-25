import { UseText } from '../utils/use_text';
import {
  idAttr,
  messages,
} from '../utils/html_related';

export default class StorageFunc {

  constructor() {}

  clear(): void {
    const confirm = window.confirm(UseText.allClear);
    if (confirm) {
      localStorage.clear();
      this.count();

      idAttr.tasks.innerHTML = messages.noTask;
    } else {
      return;
    }
  }

  count() {
    idAttr.taskCount.innerText = `${localStorage.length}`;
  }

  remove(event: MouseEvent): void {
    const value = event.target as HTMLInputElement;
    const parent = value.parentElement as HTMLInputElement;

    if (value.classList.contains('delete')) {
      parent.parentElement!.remove();
      const task = (parent.textContent as string).trim();
      localStorage.removeItem(task);

      if(localStorage.length === 0) {
        idAttr.tasks.innerHTML = messages.noTask;
      }
    }
    this.count();
  }

  save(task: string, html: string): void {
    if (html) {
      localStorage.setItem(task, html);
      return;
    }
    return;
  }
}