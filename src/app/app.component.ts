import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  onPageLoad = true;
  stopwatchToShow = true;
  ngOnInit() {
    this.onPageLoad = true;
  }

  onClickBtn(type: string) {
    this.onPageLoad = false;
    this.stopwatchToShow = type === 'stopwatch';
  }
}
