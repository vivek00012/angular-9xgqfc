import { Component } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

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

  // gives the dice to roll 1-10 time
  get noOfRolls() {
    return Math.floor(Math.random() * 10) + 1;
  }

  playAgain(): void {
    this.hidden = !this.hidden;
    this.rollRounds = 3;
    this.hide();
  }

  hide() {
    setTimeout(() => {
      this.hidden = !this.hidden;
    }, 5000);
  }

  onRoll(): void {
    this.rollRounds--;
    let interval;
    let count = this.noOfRolls;
    this.dicesConfig.map((dice) => {
      interval = setInterval(() => {
        count--;
        dice.number = new Array(this.randomNumber()).fill(``);
      }, 1000);
    });

    this.hide();

    //alert(`You have ${this.rollRounds} rounds left`);
  }
}
