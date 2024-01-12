import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with default values', () => {
    expect(component).toBeTruthy();
    expect(component.logoUrl).toBe('');
    expect(component.logoAlt).toBe('');
    expect(component.logoClass).toBe('');
    expect(component.logoWidth).toBe('');
    expect(component.logoHeight).toBe('');
  });

  it('should set the component with custom values', () => {
    component.logoUrl = 'assets/images/logo.png';
    component.logoAlt = 'Logo';
    component.logoClass = 'main_logo';
    component.logoWidth = '100';
    component.logoHeight = '100';

    fixture.detectChanges();

    expect(component.logoUrl).toBe('assets/images/logo.png');
    expect(component.logoAlt).toBe('Logo');
    expect(component.logoClass).toBe('main_logo');
    expect(component.logoWidth).toBe('100');
    expect(component.logoHeight).toBe('100');
  });


});
