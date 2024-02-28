import { Component } from '@angular/core';
import { CardsService } from '../../../services/cards.service';
import { PlayersService } from '../../../services/players.service';
import { Cards } from '../../../interfaces/cards.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  public cards: Cards[] = [];


  isCardChosen: boolean = false;
  sessionPlayerId: number = 0;

  constructor(private cardsService: CardsService, private playersService: PlayersService) { }

  ngOnInit() {
    this.cardsService.getCards().subscribe((cards: Cards[]) => {
      this.cards = cards;
    });

  }

  onCardClicked(card: number) {
    const player = JSON.parse(localStorage.getItem('sessionPlayer')!);
    const gameId = JSON.parse(localStorage.getItem('gameData')!).id;
    this.cardsService.selectCard(player, gameId, card).subscribe((res: any) => {
      console.log(res);
    });
  }

  changeCards() {

  }
}
