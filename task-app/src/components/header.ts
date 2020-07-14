import { domUtil } from "../utils/domUtil";
import { eventEmitter } from "../utils/events";
import { EventName } from "../constants/eventConstants";

export class Header {
  private settingIcon: HTMLElement = domUtil.getElement("setting");
  private search: HTMLElement = domUtil.getElement("search");
  private searchForm: HTMLElement = domUtil.getElement("search-form");

  constructor() {
    this.search.addEventListener("input", (e) => eventEmitter.emit(EventName.SEARCH_INPUT, e));
  }
}