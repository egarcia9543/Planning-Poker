import { Injectable, computed, signal } from '@angular/core';
import { Player } from '../interfaces/players.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private listOfPlayers: Player[] = [
    {username: 'Oscar', playerType: 'player', role: 'player', initials: 'OS', score: null},
    {username: 'Luis', playerType: 'spectator', role: 'player', initials: 'LU', score: null},
    {username: 'Jorge', playerType: 'player', role: 'player', initials: 'JO', score: null},
    {username: 'Ricardo', playerType: 'player', role: 'player', initials: 'RI', score: null},
    {username: 'Alejandro', playerType: 'player', role: 'player', initials: 'AL', score: null},
    {username: 'Javier', playerType: 'player', role: 'player', initials: 'JA', score: null},
    {username: 'María', playerType: 'player', role: 'player', initials: 'MA', score: null},
  ];
  private _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  private isPlayerSpectator: boolean = false;
  private _playerType: BehaviorSubject<string> = new BehaviorSubject<string>('player');

  private isGameReadySubject = new BehaviorSubject<boolean>(false);
  isGameReady$ = this.isGameReadySubject.asObservable();

  private sessionPlayer: BehaviorSubject<Player> = new BehaviorSubject<Player>(JSON.parse(sessionStorage.getItem('sessionPlayer') || '{}'));
  private _sessionPlayer = this.sessionPlayer.asObservable();
  
  constructor() { }

  isGameReady(): boolean {
    return this.isGameReadySubject.getValue();
  }

  setGameReady(isGameReady: boolean) {
    this.isGameReadySubject.next(isGameReady);
  }

  get players() {
    return this._players.asObservable();
  }

  get playerType() {
    return this._playerType.asObservable();
  }

  get playerInSession() {
    return this._sessionPlayer;
  }

  registerPlayer(player: Player) {
    this.listOfPlayers.push(player);
    this._players.next(this.listOfPlayers);

    if (player.playerType === 'spectator') {
      this.isPlayerSpectator = true;
      this._playerType.next('spectator');
    }

    this.sessionPlayer.next(player);
    sessionStorage.setItem('sessionPlayer', JSON.stringify(player));
    
    this.setGameReady(true);
  }

  setPlayerType(playerType: string) {
    this._playerType.next(playerType);
    this.isPlayerSpectator = playerType === 'spectator' ? true : false;
    this.sessionPlayer.next({...this.sessionPlayer.getValue(), playerType: playerType});
    this.players.subscribe(players => {
      const playerIndex = players.findIndex(player => player.username === this.sessionPlayer.getValue().username);
      players[playerIndex].playerType = playerType;
    });
  }
}
