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
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { TitleComponent } from '../../components/atoms/title/title.component';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent, NavbarComponent, CardComponent, ButtonComponent, CommonModule, LogoComponent, TitleComponent],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {
  isGameReady: boolean = false;
  isSpectator: boolean = false;
  revealCards: boolean = false;
  canRevealCards: boolean = false;
  isInviteModalOpen: boolean = false;
  inviteLink: string = '';
  boardName = signal<string>('');
  players: Player[] = [];
  selectedCards: (number | string)[] = [];
  votes: {[key: string]: number} = {};
  average: number = 0;
  sessionPlayer: Player = {username: '', playerType: '', role: '', initials: '', score: null}

  constructor(private route: ActivatedRoute, private playerService: PlayersService, private cardsService: CardsService) {
    this.playerService.isGameReady$.subscribe((value: boolean) => {
      this.isGameReady = value;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boardName.set(params['id']);
      this.inviteLink = `localhost:4200/game/${params['id']}`;
    })

    this.playerService.players.subscribe(players => {
      this.players = players;
    });

    this.playerService.playerInSession.subscribe(player => {
      this.sessionPlayer = player;
      sessionStorage.setItem('sessionPlayer', JSON.stringify(player));
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
      } else {
        this.selectedCards = [];
        this.canRevealCards = false;
      }
    });

    this.cardsService.averageCards.subscribe(average => {
      this.average = average;
    });

    this.cardsService.votes.subscribe(votes => {
      this.votes = votes;
    });
  }

  changePlayerType(player: Player) {
    if (this.selectedCards.length > 0) {
      alert('Ya has votado, no puedes cambiar de rol');
      return;
    } else {
      if(player.playerType === 'player') {
        this.playerService.setPlayerType('spectator');
        this.isSpectator = true;
      } else {
        this.playerService.setPlayerType('player');
        this.isSpectator = false;
      }
    }
  }
  
  revealCardsEvent() {
    if (JSON.parse(sessionStorage.getItem('sessionPlayer') || '{}').role === 'admin') {
      this.revealCards = !this.revealCards;
      this.cardsService.calcAverage();
      this.cardsService.countCardVotes();
    } else {
      alert('No eres admin');
    }
  }

  resetGame() {
    if (JSON.parse(sessionStorage.getItem('sessionPlayer') || '{}').role === 'admin') {
      this.cardsService.resetGame();
      this.revealCards = false;
      this.votes = {};
      this.canRevealCards = false;
      this.selectedCards = [];
    } else {
      alert('No eres admin');
    }
  }

  copyToClipboard() {
    const link = document.getElementById('invite-link') as HTMLInputElement;
    link.select();
    document.execCommand('copy');
  }
  
  toggleInviteModal() {
    this.isInviteModalOpen = !this.isInviteModalOpen;
  }
}
