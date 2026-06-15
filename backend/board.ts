import { Marker } from "../types/shared";

type WinPattern = [number, number, number];

export class Board {
  readonly winPatterns: WinPattern[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  private board: Marker[] = Array(9).fill(null);

  setField(field: number, marker: Exclude<Marker, null>): void {
    if (field < 0 || field > 8) {
      throw new Error("Ungültiges Feld");
    }

    if (this.board[field] !== null) {
      throw new Error("Feld bereits belegt");
    }

    this.board[field] = marker;
  }

  checkWin(): boolean {
    return this.winPatterns.some(([a, b, c]) =>
      this.board[a] !== null &&
      this.board[a] === this.board[b] &&
      this.board[a] === this.board[c]
    );
  }

  reset(): void {
    this.board.fill(null);
  }

	getBoard(): Marker[] {
		return this.board;
	}
}