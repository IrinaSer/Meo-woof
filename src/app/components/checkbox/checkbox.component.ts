import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() labelText: string;
  @Input() boldText: string;
  @Input() isLarge: boolean;
  @Input() value: string;

  @Output() checkboxChanged = new EventEmitter();

  @ViewChild('checkbox', {static: true}) checkboxElement: ElementRef;
  color = 'blue';

  constructor() { }

  ngOnInit(): void {
    const savedValue = localStorage.getItem(this.value);
    this.checkboxElement.nativeElement.checked = savedValue === 'true';
    /* chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.greeting === "hello")
          sendResponse({farewell: "goodbye"});
      }
    ); */
  }

  public toggleCheckbox(): void {
    localStorage.setItem(this.value, String(this.checkboxElement.nativeElement.checked));
    /* chrome.storage.sync.set({key: val}, function() {
      console.log('Value is set ', key, val);
    }); */
  }

}
