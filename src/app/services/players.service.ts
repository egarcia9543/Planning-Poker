import { Injectable, computed, signal } from '@angular/core';
import { Player } from '../interfaces/players.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private listOfPlayers: Player[] = [
    {username: 'Oscar', playerType: 'player', role: 'player', initials: 'OS', score: null},
    {username: 'Luis', playerType: 'player', role: 'player', initials: 'LU', score: null},
    {username: 'Jorge', playerType: 'player', role: 'player', initials: 'JO', score: null},
    {username: 'Ricardo', playerType: 'player', role: 'player', initials: 'RI', score: null},
    {username: 'Alejandro', playerType: 'player', role: 'player', initials: 'AL', score: null},
    {username: 'Javier', playerType: 'player', role: 'player', initials: 'JA', score: null},
    {username: 'María', playerType: 'player', role: 'player', initials: 'MA', score: null},
  ];
  private _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  private isGameReadySubject = new BehaviorSubject<boolean>(false);
  isGameReady$ = this.isGameReadySubject.asObservable();
  
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

  registerPlayer(player: Player) {
    this.listOfPlayers.push(player);
    this._players.next(this.listOfPlayers);
    
    this.setGameReady(true);
  }
}
