import { Component } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { NavbarComponent } from '../../components/organisms/navbar/navbar.component';
import { CreateGameFormComponent } from '../../components/molecules/create-game-form/create-game-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, NavbarComponent, CreateGameFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
