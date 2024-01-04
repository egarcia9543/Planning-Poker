import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }
  private chosenCards: (number | string)[] = [];
  private _chosenCards: BehaviorSubject<(number | string)[]> = new BehaviorSubject<(number | string)[]>([]);
  private _countCards: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  private average: number = 0;
  private _average: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get selectedCards() {
    return this._chosenCards.asObservable();
  }

  get countSelectedCards() {
    return this._countCards.asObservable();
  }

  get averageCards() {
    return this._average.asObservable();
  }

  addCard(card: number | string) {
    this.chosenCards.push(card);
    this._chosenCards.next(this.chosenCards);
  }

  calcAverage() {
    let sum = 0;
    this.chosenCards.forEach(card => {
      if (card !== '?' && card !== '☕') {
        sum += Number(card);
      }
    })
    this.average = Number((sum / this.chosenCards.length).toFixed(2));
    this._average.next(this.average);
  }
  // resetCards() {
  //   this.chosenCards = [];
  //   this._chosenCards.next(this.chosenCards);
  // }
}
