import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private playerService: PlayersService) { }
  private chosenCards: (number | string)[] = [];
  private _chosenCards: BehaviorSubject<(number | string)[]> = new BehaviorSubject<(number | string)[]>([]);

  private average: number = 0;
  private _average: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private chosenCard: number | string | null = null;
  private _chosenCard: BehaviorSubject<number | string | null> = new BehaviorSubject<number | string | null>(null);

  get cardChosen() {
    return this._chosenCard.asObservable();
  }

  get selectedCards() {
    return this._chosenCards.asObservable();
  }

  get averageCards() {
    return this._average.asObservable();
  }

  addCard(card: number | string) {
    this.chosenCards.push(card);
    this._chosenCards.next(this.chosenCards);
    this.setChosenCard(card);
  }

  setChosenCard(card: number | string | null) {
    this.chosenCard = card;
    this._chosenCard.next(this.chosenCard);
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
  
  resetGame() {
    this.chosenCards = [];
    this._chosenCards.next(this.chosenCards);
    this.average = 0;
    this._average.next(this.average);
    this.playerService.players.subscribe(players => {
      players.forEach(player => {
        player.score = null;
      })
    })
    this._chosenCard.next(null);
  }
}
