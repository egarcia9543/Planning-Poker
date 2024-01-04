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
  constructor(private cardsService: CardsService, private playersService: PlayersService) { }

  ngOnInit() {
    this.cards = [0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];
    this.playersService.players.subscribe(players => {
      this.players = players;
    })
  }

  onCardClicked(card: number | string) {
    this.cardsService.addCard(card);
    this.players[7].score = card;
    this.chosenCard = card;
  }
}
