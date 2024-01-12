import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a card to the chosen cards', () => {
    service.addCard(1);
    service.selectedCards.subscribe(cards => {
      expect(cards.length).toBe(1);
      expect(cards[0]).toBe(1);
    });
  });

  it('should calculate the average of the chosen cards', () => {
    service.addCard(1);
    service.addCard(2);
    service.addCard(3);
    service.calcAverage();
    service.averageCards.subscribe(average => {
      expect(average).toBe(2);
    });
  });

  it('should count the votes of the chosen cards', () => {
    service.addCard(1);
    service.addCard(2);
    service.addCard(3);
    service.addCard(3);
    service.countCardVotes();
    service.votes.subscribe(votes => {
      expect(votes['1']).toBe(1);
      expect(votes['2']).toBe(1);
      expect(votes['3']).toBe(2);
    });
  });

  it('should reset the game', () => {
    service.addCard(1);
    service.addCard(2);
    service.addCard(3);
    service.addCard(3);
    service.countCardVotes();
    service.resetGame();
    service.selectedCards.subscribe(cards => {
      expect(cards.length).toBe(0);
    });
    service.averageCards.subscribe(average => {
      expect(average).toBe(0);
    });
    service.votes.subscribe(votes => {
      expect(votes).toEqual({});
    });
  });
});
