import { ConfirmMessage } from '../constants/message.constants';
import { idAttr } from '../utils/html_related';

export class Storage {

  get count(): string {
    return localStorage.length.toLocaleString();
  }

  clear(): void {
    const confirm = window.confirm(ConfirmMessage.ALL_CLEAR);
    if (confirm) {
      localStorage.clear();
      idAttr.taskCount.textContent = localStorage.length.toLocaleString();
      idAttr.tasks.innerHTML = "";
    }
  }

  remove(event: MouseEvent): void {
    const value = event.target as HTMLInputElement;
    const parent = value.parentElement as HTMLInputElement;

    if (value.classList.contains('delete')) {
      parent.parentElement!.remove();
      const task = (parent.textContent as string).trim();
      localStorage.removeItem(task);
    }
    idAttr.taskCount.textContent = this.count;
  }

  save(task: string, html: string): void {
    if (html) {
      localStorage.setItem(task, html);
      return;
    }
  }
}