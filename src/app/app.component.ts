import { Component } from '@angular/core';

interface Idice {
  isRolled: boolean;
  number: Number[];
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  randomNumber = () => Math.floor(Math.random() * 6) + 1;
  public rollRounds: number = 3;
  public hidden = false;
  rolling: boolean = false;
  public interval;
  rollingText = 'Rolling !!';

  dicesConfig: Idice[] = [
    {
      isRolled: false,
      number: new Array(this.randomNumber()).fill(''),
    },
    {
      isRolled: false,
      number: new Array(this.randomNumber()).fill(``),
    },
    {
      isRolled: false,
      number: new Array(this.randomNumber()).fill(''),
    },
  ];

  constructor() {
    this.hide();
  }

  // gives the dice to roll 4-10 time
  // get noOfRolls() {
  //   return Math.floor(Math.random() * (10 - 4)) + 4;
  // }

  playAgain(): void {
    this.hidden = !this.hidden;
    this.rolling = false;
    this.rollRounds = 3;
    this.dicesConfig.map((d) => {
      d.isRolled = false;
    });
    this.hide();
  }

  hide() {
    setTimeout(() => {
      this.hidden = !this.hidden;
    }, 5000);
  }

  onRoll(): void {
    this.rollingText = 'Rolling!!';
    this.rolling = true;
    this.rollRounds--;
    this.interval = setInterval(() => {
      this.dicesConfig.map((dice) => {
        if (!dice.isRolled) {
          dice.number = new Array(this.randomNumber()).fill(``);
          this.rolling = true;
          this.rollingText = `You Have ${this.rollRounds} round(s) Left!!`;
        }
      });
    }, 1000);
    this.hide();
  }

  stopRolling(): void {
    clearInterval(this.interval);
    this.rolling = false;
    if (this.rollRounds == 2) {
      this.dicesConfig[0].isRolled = true;
    }
    if (this.rollRounds == 1) {
      this.dicesConfig[1].isRolled = true;
    }
    if (this.rollRounds == 0) {
      this.dicesConfig[2].isRolled = true;
    }
    if (this.rollRounds == 1 || this.rollRounds == 0) {
      if (
        this.dicesConfig[1].number.length == this.dicesConfig[0].number.length
      ) {
        this.dicesConfig[2].number = this.dicesConfig[0].number;
        this.rollRounds = 0;
        this.rollingText = 'You Won!';
        this.rolling = true;
      }

      if (
        this.dicesConfig[2].number.length == this.dicesConfig[0].number.length
      ) {
        this.dicesConfig[1].number = this.dicesConfig[0].number;
        this.rollRounds = 0;
        this.rollingText = 'You Won!';
        this.rolling = true;
      }
    }
  }
}
