import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
  @Input() logoUrl: string = '';
  @Input() logoAlt: string = '';
  @Input() logoClass: string = '';
  @Input() logoWidth: string = '';
  @Input() logoHeight: string = '';
}
