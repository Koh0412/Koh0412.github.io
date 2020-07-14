import { domUtil } from "../utils/domUtil";
import { eventEmitter } from "../utils/events";
import { EventName } from "../constants/event.constants";
import { injectable } from "tsyringe";
import { Storage } from "../services/storage";

@injectable()
export class Header {
  private settingIcon: HTMLElement = domUtil.getElement("setting");
  private search: HTMLElement = domUtil.getElement("search");
  private searchForm: HTMLElement = domUtil.getElement("search-form");

  constructor(private readonly storageService: Storage) {
    this.search.addEventListener("input", (e) => eventEmitter.emit(EventName.SEARCH_INPUT, e));

    this.settingIcon.addEventListener("click", this.storageService.clear.bind(this));
    this.searchForm.onsubmit = () => { return false };
  }
}