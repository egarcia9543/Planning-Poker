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
      this.inviteLink = `${window.location.href}`;
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
        if (this.sessionPlayer.role === 'player') {
          this.autoRevealCards();
          this.autoResetGame();
        }
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

    this.playerService.setPlayerRole();
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
      this.revealCards = !this.revealCards;
      this.cardsService.calcAverage();
      this.cardsService.countCardVotes();
  }

  autoRevealCards() {
    setTimeout(() => {
      this.revealCardsEvent();
    }, 5000);
  }

  autoResetGame() {
    setTimeout(() => {
      this.resetGame();
    }, 10000);
  }

  resetGame() {
      this.cardsService.resetGame();
      this.revealCards = false;
      this.votes = {};
      this.canRevealCards = false;
      this.selectedCards = [];
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
