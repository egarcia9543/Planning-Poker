import { Component, Input, inject, signal } from '@angular/core';
import { SignupFormComponent } from '../../components/molecules/signup-form/signup-form.component';
import { PlayersService } from '../../services/players.service';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../interfaces/players.interface';
import { CardComponent } from '../../components/molecules/card/card.component';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent, NavbarComponent, CardComponent],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {
  isGameReady: boolean = false;
  isSpectator: boolean = false;
  revealCards: boolean = false;
  boardName = signal<string>('');
  players: Player[] = [];

  constructor(private route: ActivatedRoute, private playerService: PlayersService, private cardsService: CardsService) {
    this.playerService.isGameReady$.subscribe((value: boolean) => {
      this.isGameReady = value;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boardName.set(params['id']);
    })

    this.playerService.players.subscribe(players => {
      this.players = players;
    });

    this.playerService.playerType.subscribe(playerType => {
      if (playerType === 'spectator') {
        this.isSpectator = true;
      }
    })

    this.cardsService.selectedCards.subscribe(cards => {
      console.log(cards);
    })
  }
}
