import { Component, Input, inject, signal } from '@angular/core';
import { SignupFormComponent } from '../../components/molecules/signup-form/signup-form.component';
import { PlayersService } from '../../services/players.service';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Player } from '../../interfaces/players.interface';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent, NavbarComponent],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {
  isGameReady: boolean = false;
  isSpectator: boolean = false;
  boardName = signal<string>('');
  players: Player[] = [];


  constructor(private route: ActivatedRoute, private playerService: PlayersService) {
    this.playerService.isGameReady$.subscribe((value: boolean) => {
      this.isGameReady = value;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boardName.set(params['id']);
    })

    this.playerService.players.subscribe(players => {
      console.log(players);
      this.players = players;
    });
  }
}
