import { Component, Input } from '@angular/core';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TitleComponent } from '../../atoms/title/title.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LogoComponent, ButtonComponent, TitleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() location: string = '';
  @Input() title: string = '';
  @Input() initials: string = '';
}
