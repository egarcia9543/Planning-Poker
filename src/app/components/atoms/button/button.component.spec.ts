import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.buttonClass = 'button';
    component.buttonText = 'Button';
    component.buttonDisabled = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have buttonClass', () => {
    expect(component.buttonClass).toEqual('button');
  });

  it('should have buttonText', () => {
    expect(component.buttonText).toEqual('Button');
  });

  it('should have buttonDisabled', () => {
    expect(component.buttonDisabled).toEqual(false);
  });

  it('should have buttonClicked', () => {
    expect(component.buttonClicked).toBeTruthy();
  });

  it('should have buttonClickedEvent', () => {
    expect(component.buttonClickedEvent).toBeTruthy();
  });

  it('should emit buttonClickedEvent', () => {
    spyOn(component.buttonClicked, 'emit');
    component.buttonClickedEvent({});
    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });
});
