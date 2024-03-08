import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentHour: string = '';
  currentMinute: string = '';
  currentSecond: string = '';
  currentDuration: string = '';

  currentDay: string = new Date().toDateString().substring(0, 3);

  private subscription: Subscription = new Subscription();

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.updateTime();
    });
    this.updateTime();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateTime(): void {
    const now = new Date();
    const formattedHour = this.datePipe.transform(now, 'hh');
    const formattedMinute = this.datePipe.transform(now, 'mm');
    const formattedSecond = this.datePipe.transform(now, 'ss');
    const formattedDuration = this.datePipe.transform(now, 'a');
    if (formattedHour !== null || formattedMinute !== null || formattedSecond !== null || formattedDuration !== null) {
      this.currentHour = formattedHour || '';
      this.currentMinute = formattedMinute || '';
      this.currentSecond = formattedSecond || '';
      this.currentDuration = formattedDuration || '';
      // this.changeColor();
    } else {
      console.error("Error: Formatted time is null");
    }
  }

  // Code to change color every second

  /* changeColor(): void {
    const randomColor = '#' +Math.floor(Math.random()*16777215).toString(16);
    const clockDisplayElement = document.getElementById('clock-display');
    if(clockDisplayElement !== null){
      clockDisplayElement.style.color = randomColor;
    } else {
      console.error('Error: clock display element not found');
    }
  } */
}
