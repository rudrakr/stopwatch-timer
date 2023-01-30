import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  miliSec = 0;
  sec = 0;
  minute = 0;
  hour = 0;
  timeToShow = '';
  incrementOp: any;
  nowTimeInMs = 0;
  diffToDate: Date = new Date();
  miliSecondWhilePaused = 0;
  timeButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  timePressed = '';
  showTimeSetButtons = true;
  constructor() {}

  ngOnInit() {}

  playAudio() {
    let audio = new Audio();
    audio.src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3';
    audio.load();
    audio.play();
  }
  public onClickStart() {
    this.nowTimeInMs = Date.now().valueOf();
    let addedTime = 0;
    if (this.miliSecondWhilePaused > 0) {
      addedTime = this.nowTimeInMs + this.miliSecondWhilePaused;
    } else {
      addedTime =
        this.nowTimeInMs +
        this.hour * 60 * 60 * 1000 +
        this.minute * 60 * 1000 +
        this.sec * 1000 +
        this.miliSec;
    }
    this.incrementOp = setInterval(() => {
      let differenece = 0;
      // console.log('this.miliSecondWhilePaused ', this.miliSecondWhilePaused);
      // if (this.miliSecondWhilePaused > 0) {
      //   differenece = this.actualTime - this.miliSecondWhilePaused;
      // } else {
      differenece = addedTime - Date.now().valueOf();
      // }
      if (differenece > 0) {
        differenece = differenece;
        this.diffToDate = new Date(differenece);
        this.miliSec = this.diffToDate.getMilliseconds();
        this.sec = this.diffToDate.getSeconds();
        this.minute = this.diffToDate.getMinutes();
        this.hour = this.diffToDate.getUTCHours();
      } else {
        clearInterval(this.incrementOp);
        this.playAudio();
        this.miliSecondWhilePaused = 0;
        this.onClickClear();
      }
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
      this.onClickClear();
      setTimeout(() => {
        this.showTimeSetButtons = true;
      }, 100);
      // this.formattedTimeToShow();
    }
  }

  onClickSet() {
    var extraSec,
      extraMin = 0;
    if (this.sec > 60) {
      extraSec = this.sec - 60;
      this.sec = extraSec;
      this.minute = ++this.minute;
    }
    if (this.minute > 60) {
      extraMin = this.minute - 60;
      this.minute = extraMin;
      this.hour = ++this.hour;
    }
    this.showTimeSetButtons = false;
  }

  onClickTime(time:number) {
    if (this.timePressed.length < 6) {
      this.timePressed = this.timePressed + time.toString();
    }
    console.log(this.timePressed);
    this.sec = parseInt(this.timePressed);
    if (this.timePressed.length > 2 && this.timePressed.length < 5) {
      this.sec = parseInt(this.timePressed.slice(-2));
      this.minute = parseInt(
        this.timePressed.substring(0, this.timePressed.length - 2)
      );
    } else if (this.timePressed.length > 4) {
      this.sec = parseInt(this.timePressed.slice(-2));
      this.minute = parseInt(this.timePressed.slice(2, 4));
      this.hour = parseInt(
        this.timePressed.substring(0, this.timePressed.length - 4)
      );
    }
  }

  onClickClear() {
    this.timePressed = '';
    this.miliSec = this.sec = this.minute = this.hour = 0;
  }
}
