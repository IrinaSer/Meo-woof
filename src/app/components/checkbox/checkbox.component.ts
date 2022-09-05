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
  @Input() isChecked: boolean;

  @Output() checkboxChange = new EventEmitter<boolean>();

  @ViewChild('checkbox', {static: true}) checkboxElement: ElementRef;

  constructor() {}

  ngOnInit(): void {
    const key = this.value;
    const isChecked = this.isChecked;
    chrome.storage.sync.get([key], (result) => {
      this.checkboxElement.nativeElement.checked = isChecked ? true : result[key] === 'true';
    });
  }

  public toggleCheckbox(): void {
    const key = this.value;
    const p: any = {};
    p[key] = String(this.checkboxElement.nativeElement.checked);

    chrome.storage.sync.set(p);
    this.checkboxChange.emit(this.checkboxElement.nativeElement.checked);
  }

}
