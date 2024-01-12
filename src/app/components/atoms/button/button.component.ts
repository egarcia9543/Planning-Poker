import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonClass: string = '';
  @Input() buttonText: string = '';
  @Input() buttonDisabled: boolean = false;
  @Output() buttonClicked = new EventEmitter();

  buttonClickedEvent(event: any) {
    this.buttonClicked.emit();
  }

}
