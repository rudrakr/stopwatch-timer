import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {
  miliSec = 0;
  sec = 0;
  minute = 0;
  hour = 0;
  timeToShow = '';
  incrementOp: any;
  nowTimeInMs = 0;
  diffToDate: Date = new Date();
  miliSecondWhilePaused = 0;
  constructor() {}

  ngOnInit() {}
  public onClickStart() {
    this.nowTimeInMs = Date.now().valueOf();
    this.incrementOp = setInterval(() => {
      let differenece = Date.now().valueOf() - this.nowTimeInMs;
      differenece = differenece + this.miliSecondWhilePaused;
      this.diffToDate = new Date(differenece);
      this.miliSec = this.diffToDate.getMilliseconds();
      this.sec = this.diffToDate.getSeconds();
      this.minute = this.diffToDate.getMinutes();
      this.hour = this.diffToDate.getUTCHours();
    }, 10);
  }

  onClickReset(type: string) {
    clearInterval(this.incrementOp);
    if (type === 'pause') {
      this.miliSecondWhilePaused =
        this.hour * 60 * 60 * 1000 +
        this.minute * 60 * 1000 +
        this.sec * 1000 +
        this.miliSec;
    } else {
      this.miliSec = 0;
      this.sec = this.minute = this.hour = 0;
      // this.formattedTimeToShow();
    }
  }
}
