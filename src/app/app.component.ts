import { Component, OnInit } from "@angular/core";
import { interval, Observable, PartialObserver, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  runTime = 0;
  count = 0;
  alphabets: string[] = [];
  display: Observable<number>;
  time: PartialObserver<number>;
  stopClick$ = new Subject();
  pauseClick$ = new Subject();
  htmlDisp: any[] = [];

  ngOnInit() {
    this.dynamicAlphabets();
  }

  start() {
    this.display = interval(1000).pipe(
      takeUntil(this.pauseClick$),
      takeUntil(this.stopClick$)
    );

    this.time = {
      next: () => {
        if (this.runTime >= 0 && this.runTime < this.alphabets.length) {
          this.runTime++;
          this.timeFormatDisplay(this.runTime, this.alphabets);
        } else {
          this.stop();
        }
      }
    };
    this.display.subscribe(this.time);
  }

  timeFormatDisplay(value: number, chars: any): void {
    let hrs = Math.floor(value / 3600);
    let min = Math.floor((value % 3600) / 60);
    let sec = Math.floor(value - min * 60);
    let res = `${("00" + hrs).slice(-2)} : ${("00" + min).slice(-2)} : ${(
      "00" + sec
    ).slice(-2)} => ${chars[value - 1].repeat(value)}`;
    if (value % 2 === 0) {
      let add = `${("00" + hrs).slice(-2)} : ${("00" + min).slice(-2)} : ${(
        "00" + sec
      ).slice(-2)} => ${(this.count += 10)}`;
      this.htmlDisp.push(res);
      this.htmlDisp.push(add);
    } else {
      this.htmlDisp.push(res);
    }
  }

  pause() {
    this.pauseClick$.next();
  }

  restart() {
    this.display.subscribe(this.time);
  }

  stop() {
    this.runTime = 0;
    this.count = 0;
    this.stopClick$.next();
    this.htmlDisp = [];
  }

  dynamicAlphabets() {
    this.alphabets = [...Array(26)].map((a, b) =>
      String.fromCharCode(b + 97).toUpperCase()
    );
  }
}
