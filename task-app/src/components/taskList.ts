import { domUtil } from "../utils/domUtil";
import { injectable } from "tsyringe";
import { Storage } from "../services/storage";
import { idAttr } from "../utils/html_related";
import { eventEmitter } from "../utils/events";
import { EventName } from "../constants/event.constants";

/** タスクリストのコンポネント */
@injectable()
export class TaskList {
  private listItem: HTMLElement = domUtil.getElement("tasks");

  constructor(private readonly storageService: Storage) {
    this.dispTaskList();
    this.listItem.addEventListener('click', (e) => this.storageService.remove(e));

    eventEmitter.on(EventName.SEARCH_INPUT, (e: Event) => {
      this.listItem.innerHTML = "";
      const value = (e.target as HTMLInputElement).value;
      this.searchTask(value);
    });
  }

  /**
   * タスクの表示
   */
  private dispTaskList() {
    for (const key in localStorage) {
      const item: string | null = localStorage.getItem(key);
      if (item) {
        this.listItem.innerHTML += item;
      }
    }
    idAttr.taskCount.innerHTML = this.storageService.count;
  }

  /**
   * valueでタスクの検索を行う
   * @param value
   */
  private searchTask(value: string) {
    const arr = [];
    for (const key in localStorage) {
      const html: string | null = localStorage.getItem(key);

      if(html) {
        if(key.includes(value)) {
          arr.push(key);
          this.listItem.innerHTML += html
        }
      }
    }
    idAttr.taskCount.textContent = arr.length.toLocaleString();
  }
}