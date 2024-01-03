import { Component, Input, inject, signal } from '@angular/core';
import { SignupFormComponent } from '../../components/molecules/signup-form/signup-form.component';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent {

}
