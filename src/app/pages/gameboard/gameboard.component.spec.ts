import { PlayersService } from './../../services/players.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameboardComponent } from './gameboard.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CardsService } from '../../services/cards.service';

let mockedPlayersService: any;
mockedPlayersService = {
  gameStatus: of (true),
  players: of ([{
    username: 'Oscar', 
    playerType: 'player', 
    role: 'player', 
    initials: 'OS', 
    score: null
  }]),
  playerType: of ('spectator'),
  playerInSession: of ({username: 'Testuser', playerType: 'player', role: 'admin', initials: 'TE', score: null}),
  setPlayerRole: () => {},
  setPlayerType: () => {},
  changeRoles: () => {},
}

let mockedCardsService: any;
mockedCardsService = {
  cardChosen: of (1),
  selectedCards: of ([]),
  averageCards: of (1),
  votes: of ({'1': 1}),
  addCard: () => {},
  setChosenCard: () => {},
  calcAverage: () => {},
  countCardVotes: () => {},
  resetGame: () => {},
}

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  const mockActivatedRoute = {
    params: of({id: '123'})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameboardComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: PlayersService, useValue: mockedPlayersService},
        { provide: CardsService, useValue: mockedCardsService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the player type to player when changePlayerType is called', () => {
    component.changePlayerType({username: 'John', playerType: 'spectator', role: 'player', initials: 'JO', score: null});
    expect(component.isSpectator).toBe(false);
  });

  it('should change the player type to spectator when changePlayerType is called', () => {
    component.changePlayerType({username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null});
    expect(component.isSpectator).toBe(true);
  });

  it('should alert the user when changePlayerType is called and the user has already voted', () => {
    component.selectedCards = [1];
    const alertSpy = spyOn(window, 'alert');
    component.changePlayerType({username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null});
    expect(alertSpy).toHaveBeenCalled();
  });

  it('should reveal the cards when revealCardsEvent is called', () => {
    const averageSpy = spyOn(mockedCardsService, 'calcAverage');
    const votesSpy = spyOn(mockedCardsService, 'countCardVotes');
    component.revealCardsEvent();
    expect(averageSpy).toHaveBeenCalled();
    expect(votesSpy).toHaveBeenCalled();
  });

  it('should reset the game when resetGame is called', () => {
    const serviceSpy = spyOn(mockedCardsService, 'resetGame');
    component.resetGame();
    expect(serviceSpy).toHaveBeenCalled
  });

  it('should open the invite modal when toggleInviteModal is called', () => {
    component.toggleInviteModal();
    expect(component.isInviteModalOpen).toBe(true);
  });

  it('should make admin the player chosen when makeAdmin is called', () => {
    const serviceSpy = spyOn(mockedPlayersService, 'changeRoles');
    serviceSpy.and.returnValue('admin')
    component.makeAdmin({username: 'John', playerType: 'player', role: 'player', initials: 'JO', score: null})
    expect(mockedPlayersService.changeRoles).toHaveBeenCalled
  });
});