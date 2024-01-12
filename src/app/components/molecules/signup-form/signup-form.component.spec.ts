import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isGameReady).toBe(false);
    expect(component.signupForm.get('username')?.value).toBe('');
    expect(component.signupForm.get('playerType')?.value).toBe('');
  });

  it('should check if the form is valid', () => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    const component = fixture.componentInstance;
    
    component.signupForm.setValue({
      username: 'John Doe',
      playerType: 'player'
    });

    expect(component.signupForm.valid).toBe(true);
  });

  it('should check if the form is invalid', () => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    const component = fixture.componentInstance;
    
    component.signupForm.setValue({
      username: '',
      playerType: ''
    });

    expect(component.signupForm.valid).toBe(false);
  });

  it('should send the form data when onSubmit is called', () => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    const component = fixture.componentInstance;
    
    component.signupForm.setValue({
      username: 'John Doe',
      playerType: 'player'
    });

    component.onSubmit();

    expect(component.isGameReady).toBe(true);
  });
});
