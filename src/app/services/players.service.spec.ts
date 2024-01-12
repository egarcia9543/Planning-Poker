import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a player', () => {
    const player = {username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    
    service.players.subscribe(players => {
      expect(players.length).toBe(8);
      expect(players.some(p => p.username === 'John')).toBe(true);
    });

    service.playerInSession.subscribe(player => {
      expect(player.username).toBe('John');
    });
  });

  it('should set the game status', () => {
    service.setGameReady(true);
    service.gameStatus.subscribe(status => {
      expect(status).toBe(true);
    });
  });

  it('should set the first player as admin', () => {
    const player = {username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    spyOn(Math, 'random').and.returnValue(0);
    service.setPlayerRole();
    service.players.subscribe(players => {
      expect(players[0].role).toBe('admin');
    });
  });

  it('should set the first player as player', () => {
    const player = {username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    spyOn(Math, 'random').and.returnValue(1);
    service.setPlayerRole();
    service.players.subscribe(players => {
      expect(players[0].role).toBe('player');
    });
  });

  it('should set the player type to player', () => {
    const player = {username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    service.setPlayerType('spectator');
    service.playerType.subscribe(playerType => {
      expect(playerType).toBe('spectator');
    });
  });

  it('should set the player type to spectator', () => {
    const player = {username: 'John', playerType: 'spectator', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    service.setPlayerType('spectator');
    service.playerType.subscribe(playerType => {
      expect(playerType).toBe('spectator');
    });
  });

  it('should change the player roles', () => {
    const player = {username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null};
    service.registerPlayer(player);
    service.changeRoles(1);
    service.players.subscribe(players => {
      expect(players[0].role).toBe('player');
      expect(players[1].role).toBe('admin');
    });
  });
});
