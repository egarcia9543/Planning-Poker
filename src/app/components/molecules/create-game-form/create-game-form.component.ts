import { Component } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-game-form.component.html',
  styleUrl: './create-game-form.component.css'
})
export class CreateGameFormComponent {
  constructor(private router: Router) {}

  checkForm = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*')
    ]
  })

  createGame() {
    if (this.checkForm.valid) {
      this.router.navigateByUrl(`/game/${this.checkForm.value}`);
    }
  }
}
