import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardGameComponent } from './board-game/board-game.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game', component: BoardGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
