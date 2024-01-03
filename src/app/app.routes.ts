import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameboardComponent } from './pages/gameboard/gameboard.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game/:id', component: GameboardComponent}
];
