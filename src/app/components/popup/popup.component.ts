import { Component, OnInit } from '@angular/core';
import ExtensionInfo = chrome.management.ExtensionInfo;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public isExtentionEnable: boolean;
  public isReady = false;
  private id: string;

  constructor() {}

  ngOnInit(): void {
    chrome.management.getSelf().then((info: ExtensionInfo) => {
      this.isExtentionEnable = info.enabled;
      this.id = info.id;
      this.isReady = true;
    });
  }

  public switchExtentionMode(value: boolean): void {
    chrome.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      const id = tabs[0].id;
      if (id) {
        chrome.tabs.sendMessage(id, {isDisable: !value});
        chrome.tabs.reload(id)
      }
      chrome.management.setEnabled(this.id, value);
    });
  }

}
