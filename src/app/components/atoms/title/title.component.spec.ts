import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with default value', () => {
    expect(component).toBeTruthy();
    expect(component.text).toBe('');
  });

  it('should set the component with custom value', () => {
    component.text = 'Title';

    fixture.detectChanges();

    expect(component.text).toBe('Title');
  });

  it('should render the component with custom value', () => {
    component.text = 'Title';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Title');
  });
});
