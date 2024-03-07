import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private datePipe: DatePipe
  ){ }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.updateTime();
    });
    this.updateTime();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateTime(): void{
    const now = new Date();
    const formattedTime = this.datePipe.transform(now, 'hh:mm:ss a');
    if(formattedTime !== null){
      this.currentTime = formattedTime;
      this.changeColor();
    } else {
      console.error("Error: Formatted time is null")
    }
  }

  changeColor(): void {
    const randomColor = '#' +Math.floor(Math.random()*16777215).toString(16);
    const clockDisplayElement = document.getElementById('clock-display');
    if(clockDisplayElement !== null){
      clockDisplayElement.style.color = randomColor;
    } else {
      console.error('Error: clock display element not found');
    }
  }
}
