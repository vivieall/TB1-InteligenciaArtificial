import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  matrix: string[];
  flag: boolean;
  winner: string;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.matrix = Array(9).fill(null);
    this.winner = null;
    this.flag = true;
  }

  get player() {
    return this.flag ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.matrix[idx]) {
      this.matrix.splice(idx, 1, this.player);
      this.flag = false;
    }
    this.winner = this.checkWinner();

    if (this.winner == null) {
      const move = this.mini_max(
        this.matrix,
        false,
        0,
        Number.MIN_VALUE,
        Number.MAX_VALUE
      );
      this.matrix.splice(move, 1, this.player);
      this.flag = true;
      this.winner = this.checkWinner();
    }
  }

  checkWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.matrix[a] &&
        this.matrix[a] === this.matrix[b] &&
        this.matrix[a] === this.matrix[c]
      ) {
        return this.matrix[a];
      }
    }

    let draw = true;
    this.matrix.forEach((v) => {
      if (v == null) {
        draw = false;
        return;
      }
    });

    if (draw) {
      return 'DRAW';
    }

    return null;
  }

  mini_max(
    matrix: string[],
    maximizing: boolean,
    depth: number,
    alpha: number,
    beta: number
  ): number {
    const winner = this.checkWinner();

    if (winner == 'X') {
      console.log("asdas");
      return 10 - depth;
    } else if (winner == 'O') {
      console.log("asdas");
      return -10 + depth;
    } else if (winner == 'DRAW') {
      console.log("asdas");
      return 0;
    }

  
    let best_index = 0;

    if (maximizing) {
      let max_eval = Number.MIN_VALUE;
      for (let index = 0; index < 9; ++index) {

        if (matrix[index] === null) {
          const auxMatrix = Array.from(matrix);
          auxMatrix[index] = 'X';

          let evaluation = this.mini_max(
            auxMatrix,
            !maximizing,
            depth + 1,
            alpha,
            beta
          );

          if (max_eval < evaluation) {
            max_eval = evaluation;
            best_index = index;
          }

          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return depth == 0 ? best_index : max_eval;
    } else {
      let min_eval = Number.MAX_VALUE;

      for (let index = 0; index < 9; ++index) {
        if (matrix[index] === null) {
          const auxMatrix = Array.from(matrix);
          auxMatrix[index] = 'O';

          let evaluation = this.mini_max(
            auxMatrix,
            !maximizing,
            depth + 1,
            alpha,
            beta
          );

          if (min_eval > evaluation) {
            min_eval = evaluation;
            best_index = index;
          }

          beta = Math.min(beta, evaluation);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return depth == 0 ? best_index : min_eval;
    }
  }
}
