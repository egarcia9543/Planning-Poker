import { Injectable } from '@angular/core';
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
  private _isGameReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private sessionPlayer: BehaviorSubject<Player> = new BehaviorSubject<Player>(JSON.parse(sessionStorage.getItem('sessionPlayer') ?? '{}'));
  private _sessionPlayer = this.sessionPlayer.asObservable();
  

  setGameReady(isGameReady: boolean) {
    this.isGameReadySubject.next(isGameReady);
    this._isGameReady.next(isGameReady);
  }

  setPlayerRole() {
    let randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      this.listOfPlayers[0].role = 'admin';
      console.log('En esta partida eres un jugador');
    } else {
      console.log('En esta partida eres el administrador');
    }
  }

  get gameStatus() {
    return this._isGameReady.asObservable();
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
    if (this.listOfPlayers[0].role === 'admin') {
      player.role = 'player';
    } else {
      player.role = 'admin';
    }
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
    this.isPlayerSpectator = playerType === 'spectator';
    this.sessionPlayer.next({...this.sessionPlayer.getValue(), playerType: playerType});
    this.players.subscribe(players => {
      const playerIndex = players.findIndex(player => player.username === this.sessionPlayer.getValue().username);
      players[playerIndex].playerType = playerType;
    });
  }

  changeRoles(index: number) {
    const prevAdmin = this.listOfPlayers.find(player => player.role === 'admin');
    const newAdmin = this.listOfPlayers[index];
    if (prevAdmin) {
      prevAdmin.role = 'player';
      this.sessionPlayer.next(prevAdmin);
    }
    newAdmin.role = 'admin';
    this._players.next(this.listOfPlayers);
  }
}
