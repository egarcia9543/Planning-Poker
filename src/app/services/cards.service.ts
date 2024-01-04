import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }
  private chosenCards: (number | string)[] = [];
  private _chosenCards: BehaviorSubject<(number | string)[]> = new BehaviorSubject<(number | string)[]>([]);

  get selectedCards() {
    return this._chosenCards.asObservable();
  }

  addCard(card: number | string) {
    this.chosenCards.push(card);
    this._chosenCards.next(this.chosenCards);
  }

  // resetCards() {
  //   this.chosenCards = [];
  //   this._chosenCards.next(this.chosenCards);
  // }
}
