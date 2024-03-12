import { PlayersService } from './../../../services/players.service';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewPlayer } from '../../../interfaces/players.interface';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  public isAdminRegistered: boolean = false;
  public isGameReady: boolean = false;
  constructor(private fb: FormBuilder, private playerService: PlayersService) {
    this.playerService.gameStatus.subscribe((value: boolean) => {
      this.isGameReady = value;
    });

    this.playerService.adminPlayer.subscribe((value: boolean) => {
      this.isAdminRegistered = value;
    });
  }

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
    const role = this.isAdminRegistered ? 'jugador' : 'propietario';
    const playerData: NewPlayer = {
      name: this.signupForm.value.username!,
      role: this.signupForm.value.playerType!,
      visualization: role
    };

    const gameData = JSON.parse(localStorage.getItem('gameData')!);
    this.playerService.registerPlayer(playerData, gameData.id)
      .subscribe(res => {
        localStorage.setItem('sessionPlayer', JSON.stringify(res));
        this.playerService.setSessionPlayer(res);
        this.playerService.setGameReady(true);
      })
  }
}
