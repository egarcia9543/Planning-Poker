import { Injectable } from '@angular/core';
import { NewPlayer, PlayersInGame } from '../interfaces/players.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl: string = environment.baseUrl;

  private isPlayerSpectator: boolean = false;
  private _playerType: BehaviorSubject<string> = new BehaviorSubject<string>('player');

  private isGameReady = new BehaviorSubject<boolean>(false);
  private _isGameReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private sessionPlayer = new BehaviorSubject<NewPlayer>({} as NewPlayer);
  private _sessionPlayer: BehaviorSubject<NewPlayer> = new BehaviorSubject<NewPlayer>({} as NewPlayer);

  private isAdminRegistered: boolean = false;
  private _isAdminRegistered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {};

  setGameReady(isGameReady: boolean) {
    this.isGameReady.next(isGameReady);
    this._isGameReady.next(isGameReady);
  };

  setSessionPlayer(player: NewPlayer) {
    this.sessionPlayer.next(player);
    this._sessionPlayer.next(player);
  };


  get gameStatus() {
    return this._isGameReady.asObservable();
  }

  get sessionPlayerData() {
    return this._sessionPlayer.asObservable();
  };

  get playerType() {
    return this._playerType.asObservable();
  }

  get adminPlayer() {
    return this._isAdminRegistered.asObservable();
  }

  registerPlayer(player: NewPlayer, gameId: string): Observable<NewPlayer> {
    const reqBody: NewPlayer = {
      game_id: gameId,
      name: player.name,
      visualization: player.visualization,
      role: player.role
    };

    if (player.visualization === 'propietario') {
      this.isAdminRegistered = true;
      this._isAdminRegistered.next(true);
    }

    if (player.role === 'espectador') {
      this.isPlayerSpectator = true;
      this._playerType.next('espectador');
    }

    return this.http.post<NewPlayer>(`${this.apiUrl}/api/v1/guest`, reqBody)
  }

  getPlayers(gameId: number, url_key: string): Observable<PlayersInGame[]> {
    return this.http.get<PlayersInGame[]>(`${this.apiUrl}/api/v1/guests/${gameId}/${url_key}`);
  }
}
