import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameFormComponent } from './create-game-form.component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

describe('CreateGameFormComponent', () => {
  let component: CreateGameFormComponent;
  let fixture: ComponentFixture<CreateGameFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [CreateGameFormComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.checkForm instanceof FormControl).toBe(true);
    expect(component.checkForm.valid).toBe(false);
  });

  it('should set checkForm to valid when form is valid', () => {
    const fixture = TestBed.createComponent(CreateGameFormComponent);
    const component = fixture.componentInstance;

    component.checkForm.setValue('Sprint');

    expect(component.checkForm.valid).toBe(true);
  });

  it('should set checkForm to invalid when form is invalid', () => {
    const fixture = TestBed.createComponent(CreateGameFormComponent);
    const component = fixture.componentInstance;

    component.checkForm.setValue('');

    expect(component.checkForm.valid).toBe(false);
  });

  it('should navigate to the game page when createGame is called', () => {
    const fixture = TestBed.createComponent(CreateGameFormComponent);
    const component = fixture.componentInstance;

    component.checkForm.setValue('Sprint');
    component.createGame();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/game/Sprint');
  });
});
