import { CardsService } from './../../services/cards.service';
import { Component, signal } from '@angular/core';
import { SignupFormComponent } from '../../components/molecules/signup-form/signup-form.component';
import { PlayersService } from '../../services/players.service';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { ActivatedRoute, Params } from '@angular/router';
import { NewPlayer, PlayersInGame } from '../../interfaces/players.interface';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/molecules/card/card.component';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { TitleComponent } from '../../components/atoms/title/title.component';
import { Game } from '../../interfaces/game.interface';
import { Subscription, interval } from 'rxjs';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent, NavbarComponent, CardComponent, ButtonComponent, CommonModule, LogoComponent, TitleComponent, InitialsPipe],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {
  isSpectator: boolean = false;
  revealCards: boolean = false;
  canRevealCards: boolean = false;
  isInviteModalOpen: boolean = false;
  inviteLink: string = '';
  selectedCards: (number | string)[] = [];
  votes: {[key: string]: number} = {};
  average: number = 0;
  isAdminRegistered: boolean = false;
  sessionPlayerId: number = 0;

  //Nuevos
  boardName = signal<string>('');
  public gameData: Game = JSON.parse(localStorage.getItem('gameData')!);
  public sessionPlayer: NewPlayer = {
    name: '',
    visualization: '',
    role: ''
  };
  public isGameReady: boolean = false;
  private intervalSubscription: Subscription = new Subscription();
  public players: PlayersInGame[] = [];


  constructor(private route: ActivatedRoute, private playerService: PlayersService, private cardsService: CardsService) {
    this.playerService.adminPlayer.subscribe((value: boolean) => {
      this.isAdminRegistered = value;
    });

  }


  ngOnInit() {
    //NEW
    this.playerService.gameStatus.subscribe((value: boolean) => {
      this.isGameReady = value;
    });


    this.intervalSubscription = interval(1000).subscribe(() => {
      this.playerService.getPlayers(this.gameData.id, this.gameData.url_key).subscribe((players: PlayersInGame[]) => {
        this.players = players;
      });
    });
    
    this.sessionPlayerId = this.players.find(player => player.guest_name === this.sessionPlayer.name)!.guest_id;
    localStorage.setItem('sessionPlayerId', this.sessionPlayerId.toString());
  }

  changePlayerType() {
    console.log('PlayerVIsual')
    // if (this.selectedCards.length > 0) {
      //   alert('Ya has votado, no puedes cambiar de rol');
      // } else if (player.playerType === 'player') {
    //     this.playerService.setPlayerType('spectator');
    //     this.isSpectator = true;
    //   } else {
    //     this.playerService.setPlayerType('player');
    //     this.isSpectator = false;
    //   }
  }

  revealCardsEvent() {
      this.revealCards = !this.revealCards;
      this.cardsService.calcAverage();
      this.cardsService.countCardVotes();
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
    navigator.clipboard.writeText(link.value);
  }

  toggleInviteModal() {
    this.isInviteModalOpen = !this.isInviteModalOpen;
  }

  makeAdmin() {
    // const playerIndex = this.players.findIndex(player => player.username === playerData.username);
    // this.playerService.changeRoles(playerIndex);
    console.log('ADmin')
  }
}
