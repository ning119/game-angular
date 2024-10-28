import { Component } from '@angular/core';
import { BoardGameService } from '../service/board-game/board-game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrl: './board-game.component.css'
})
export class BoardGameComponent {
  board: string[] = Array(9).fill(null);
  currentPlayer: string = 'X';
  winner: string | null = null; 
  
  isDraw: boolean = false;
  playerScore: number = 0;  // คะแนนของผู้เล่น
  botScore: number = 0;      // คะแนนของบอท
  consecutiveWins: number = 0; // จำนวนครั้งที่ชนะติดต่อกัน
  winningCombination: number[] | null = null; // เก็บตำแหน่งของช่องที่ชนะ

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        this.updateScores();
      } else if (this.board.every(cell => cell)) {
        this.isDraw = true; // ตรวจสอบว่าเกมเสมอ
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // สลับผู้เล่น
        if (this.currentPlayer === 'O') {
          this.botMove(); // ทำการเคลื่อนไหวของบอท
        }
      }
    }
  }

  botMove(): void {
    const availableMoves = this.board.map((cell, index) => cell === null ? index : null).filter(x => x !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (randomMove !== undefined) {
      this.makeMove(randomMove);
    }
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], // แถวที่ 1
      [3, 4, 5], // แถวที่ 2
      [6, 7, 8], // แถวที่ 3
      [0, 3, 6], // คอลัมน์ที่ 1
      [1, 4, 7], // คอลัมน์ที่ 2
      [2, 5, 8], // คอลัมน์ที่ 3
      [0, 4, 8], // แนวทแยงจากซ้ายไปขวา
      [2, 4, 6], // แนวทแยงจากขวาไปซ้าย
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winningCombination = combination; // เก็บตำแหน่งที่ชนะ
        return true; // พบผู้ชนะ
      }
    }
    return false; // ไม่พบผู้ชนะ
  }

  updateScores(): void {
    if (this.currentPlayer === 'X') {
      this.playerScore += 1; // ผู้เล่นชนะ
      this.consecutiveWins += 1; // เพิ่มจำนวนครั้งที่ชนะติดต่อกัน
      if (this.consecutiveWins === 3) {
        this.playerScore += 1; // เพิ่มคะแนนพิเศษ
        this.consecutiveWins = 0; // รีเซ็ตการนับ
      }
    } else {
      this.botScore += 1; // บอทชนะ
      this.playerScore -= 1; // ลดคะแนนผู้เล่น
      this.consecutiveWins = 0; // รีเซ็ตการนับ
    }
  }

  resetGame(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
    this.winningCombination = null; // รีเซ็ตตำแหน่งที่ชนะ
  }
}
