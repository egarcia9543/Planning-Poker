import { PlayersService } from './../../../services/players.service';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  constructor(private fb: FormBuilder) {
    this.playerService.isGameReady$.subscribe((value: boolean) => {
      this.isGameReady = value;
    })
  }

  private playerService = inject(PlayersService);
  isGameReady: boolean = false;

  signupForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern('(?!^d+$)(?!.*[()_,.*#/-])(?:[^0-9]*[0-9]){0,3}[^0-9]*')
    ]],
    playerType: ['', Validators.required]
  })

  onSubmit() {
    this.playerService.registerPlayer({
      username: this.signupForm.value.username ?? '',
      playerType: this.signupForm.value.playerType ?? '',
      role: '',
      initials: this.signupForm.value.username?.substring(0,2).toUpperCase() ?? '',
      score: null
    });
  }
}
