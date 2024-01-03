import { Injectable, signal } from '@angular/core';
import { Player } from '../interfaces/players.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  mockPlayers = signal<Player[]>([
    {username: 'Oscar', playerType: 'player', role: 'player', initials: 'OS', score: 0},
    {username: 'Luis', playerType: 'player', role: 'player', initials: 'LU', score: 0},
    {username: 'Jorge', playerType: 'player', role: 'player', initials: 'JO', score: 0},
    {username: 'Ricardo', playerType: 'player', role: 'player', initials: 'RI', score: 0},
    {username: 'Alejandro', playerType: 'player', role: 'player', initials: 'AL', score: 0},
    {username: 'Javier', playerType: 'player', role: 'player', initials: 'JA', score: 0},
    {username: 'María', playerType: 'player', role: 'player', initials: 'MA', score: 0},
  ]);

  constructor() { }

  registerPlayer(player: Player) {
    this.mockPlayers.set([player, ...this.mockPlayers()])
  }
}
