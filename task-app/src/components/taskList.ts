import { domUtil } from "../utils/domUtil";
import { injectable } from "tsyringe";
import { Storage } from "../services/storage";
import { idAttr } from "../utils/html_related";

@injectable()
export class TaskList {
  private listItem: HTMLElement = domUtil.getElement("tasks");

  constructor(private readonly storageService: Storage) {
    this.dispTaskList();
    this.listItem.addEventListener('click', (e) => this.storageService.remove(e));
  }

  dispTaskList() {
    for (const key in localStorage) {
      const item: string | null = localStorage.getItem(key);
      if (item) {
        this.listItem.innerHTML += item;
      }
    }
    idAttr.taskCount.innerHTML = this.storageService.count;
  }
}