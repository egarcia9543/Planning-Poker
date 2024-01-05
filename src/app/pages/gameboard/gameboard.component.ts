import { CardsService } from './../../services/cards.service';
import { Component, Input, inject, signal } from '@angular/core';
import { SignupFormComponent } from '../../components/molecules/signup-form/signup-form.component';
import { PlayersService } from '../../services/players.service';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../interfaces/players.interface';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/molecules/card/card.component';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent, NavbarComponent, CardComponent, ButtonComponent, CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {
  isGameReady: boolean = false;
  isSpectator: boolean = false;
  revealCards: boolean = false;
  canRevealCards: boolean = false;
  boardName = signal<string>('');
  players: Player[] = [];
  selectedCards: (number | string)[] = [];
  votes: {[key: string]: number} = {};
  average: number = 0;

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
    });

    this.cardsService.selectedCards.subscribe(cards => {
      if (cards.length > 0) {
        this.selectedCards = cards;
        this.canRevealCards = true;
      }
    });

    this.cardsService.averageCards.subscribe(average => {
      this.average = average;
    });
  }

  revealCardsEvent() {
    if (JSON.parse(sessionStorage.getItem('sessionPlayer') || '{}').role === 'admin') {
      this.revealCards = !this.revealCards;
      this.countVotes();
      this.cardsService.calcAverage();
    } else {
      alert('No eres admin');
    }
  }

  countVotes() {
    this.cardsService.selectedCards.forEach(card => {
      card.forEach((value: number | string) => {
        if (this.votes[value]) {
          this.votes[value] += 1;
        } else {
          this.votes[value] = 1;
        }
      })
    })
  }

  resetGame() {
    if (JSON.parse(sessionStorage.getItem('sessionPlayer') || '{}').role === 'admin') {
      this.cardsService.resetGame();
      this.revealCards = false;
      this.votes = {};
    } else {
      alert('No eres admin');
    }
  }
}
