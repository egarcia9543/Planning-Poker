import { Component } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-create-game-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.css'
})
export class CreateGameFormComponent {
  constructor(private router: Router, private gameService: GameService) {}

  checkForm = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*')
    ]
  })

  createGame(event: Event) {
    event.preventDefault();
    if (this.checkForm.valid) {
      this.gameService.createGame(this.checkForm.value!)
        .subscribe(res => {
          this.router.navigate([`game/${res.url_key}`]);
          localStorage.setItem('gameData', JSON.stringify(res));
        });
    };
  };
}
