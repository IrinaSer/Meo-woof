import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isShowIntro: boolean;

  ngOnInit(): void {
    this.isShowIntro = !localStorage.getItem('hasSeenIntro');
    if (!localStorage.getItem('hasSeenIntro')) {
      localStorage.setItem('hasSeenIntro', 'true');
    }
  }
}
