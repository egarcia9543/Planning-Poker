import { Component, EventEmitter, Output } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../interfaces/players.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cards: (number | string)[] = [];
  players: Player[] = [];
  chosenCard: number | string | null = null;
  isCardChosen: boolean = false;
  cardsOptions: (number | string)[][] = [
    [0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'],
    [0, 1, 2, 4, 8, 16, 32, 64, 128, '?', '☕'],
  ];
  sessionPlayer: Player = {username: '', playerType: '', role: '', initials: '', score: null}
  constructor(private cardsService: CardsService, private playersService: PlayersService) { }

  ngOnInit() {
    this.cards = this.cardsOptions[0];
    this.playersService.players.subscribe(players => {
      this.players = players;
    })

    this.cardsService.cardChosen.subscribe(card => {
      this.chosenCard = card;
      if (card !== null) {
        this.isCardChosen = true;
      } else {
        this.isCardChosen = false;
      }
    })

    this.playersService.playerInSession.subscribe(player => {
      this.sessionPlayer = player;
    });
  }

  onCardClicked(card: number | string) {
    this.cardsService.addCard(card);
    this.players[7].score = card;
    this.players.forEach(player => {
      if (player.playerType === 'player' && player.score === null) {
        player.score = this.cards[Math.floor(Math.random() * this.cards.length)];
        this.cardsService.addCard(player.score);
      }
    })
    this.chosenCard = card;
    this.isCardChosen = true;
  }

  changeCards() {
    if (this.chosenCard !== null) {
      this.cardsService.resetGame();
    }
    if (this.cards === this.cardsOptions[0]) {
      this.cards = this.cardsOptions[1];
    } else {
      this.cards = this.cardsOptions[0];
    }
  }
}
