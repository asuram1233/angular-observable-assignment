import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "assignment-observable";

  time: number = 0;
  count: number = 0;
  interval: any;
  htmlDisp: any[] = [];
  alphabets: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  display = new Subject();

  ngOnInit(): void {
    this.display.subscribe(res => {
      this.htmlDisp.push(res);
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time >= 0 && this.time < this.alphabets.length) {
        this.time++;
        return this.display.next(
          this.timeFormatDisplay(this.time, this.alphabets)
        );
      } else {
        // this.time = 0;
        return;
      }
    }, 1000);
  }

  timeFormatDisplay(value: number, chars: any): string {
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
      this.display.next(add);
      return res;
    } else {
      return res;
    }
  }

  stopTimer() {
    this.display.unsubscribe();
    this.htmlDisp = [];
    location.reload();
  }
}
