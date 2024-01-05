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

  private countVotes: {[key: string]: number} = {};
  private _countVotes: BehaviorSubject<{[key: string]: number}> = new BehaviorSubject<{[key: string]: number}>({});

  get cardChosen() {
    return this._chosenCard.asObservable();
  }

  get selectedCards() {
    return this._chosenCards.asObservable();
  }

  get averageCards() {
    return this._average.asObservable();
  }

  get votes() {
    return this._countVotes.asObservable();
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

  countCardVotes() {
    this.chosenCards.forEach(card => {
      if (this.countVotes[card]) {
        this.countVotes[card] += 1;
      } else {
        this.countVotes[card] = 1;
      }
    })
    this._countVotes.next(this.countVotes);
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
    this.countVotes = {};
    this._countVotes.next(this.countVotes);
  }
}
