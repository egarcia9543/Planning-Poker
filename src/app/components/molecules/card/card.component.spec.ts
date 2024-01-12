import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { of } from 'rxjs';
import { PlayersService } from '../../../services/players.service';
import { CardsService } from '../../../services/cards.service';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  let mockedPlayersService: any;
mockedPlayersService = {
  gameStatus: of (true),
  players: of ([{
    username: 'Oscar', 
    playerType: 'player', 
    role: 'player', 
    initials: 'OS', 
    score: null
  }, {
    username: 'Testuser', 
    playerType: 'player', 
    role: 'player', 
    initials: 'TE', 
    score: null
  }]),
  playerType: of ('player'),
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        { provide: PlayersService, useValue: mockedPlayersService},
        { provide: CardsService, useValue: mockedCardsService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the cards and reset the chosen cards when changeCards is called', () => {
    const spy = spyOn(mockedCardsService, 'resetGame');
    component.chosenCard = 0;
    component.changeCards();
    expect(component.cards).toEqual([0, 1, 2, 4, 8, 16, 32, 64, 128, '?', '☕']);
    expect(spy).toHaveBeenCalled();
  });

  it('should change the cards to fibonacci when changeCards is called', () => {
    component.cardsOptions = [
      [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, '?', '☕'],
      [0, 1, 2, 4, 8, 16, 32, 64, 128, '?', '☕'],
    ];
    component.changeCards();
    expect(component.cards).toEqual([0, 1, 2, 3, 5, 8, 13, 21, 34, 55, '?', '☕'],);
  });
});
