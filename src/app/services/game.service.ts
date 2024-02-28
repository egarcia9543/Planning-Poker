import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { };
  private apiUrl = environment.baseUrl

  createGame(name: string): Observable<Game> {
    const reqBody = {name: name};
    return this.http.post<Game>(`${this.apiUrl}/api/v1/games`, reqBody)
  }
}
