import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {

  private score = 0;
  private consecutiveWins = 0;

  constructor() {}

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
    this.consecutiveWins += 1;

    if (this.consecutiveWins === 3) {
      this.score += 1; // ได้คะแนนพิเศษ
      this.consecutiveWins = 0; // รีเซ็ตการนับ
    }
  }

  decrementScore() {
    this.score -= 1;
    this.consecutiveWins = 0; // รีเซ็ตการนับเมื่อแพ้
  }

  resetConsecutiveWins() {
    this.consecutiveWins = 0; // รีเซ็ตการนับ
  }
}
