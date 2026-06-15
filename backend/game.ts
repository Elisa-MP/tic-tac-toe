import { GameDO, GameStatus, Marker, Winner } from "../types/shared";
import { Board } from "./board";
import { User } from "./user";



export class Game {
	readonly id: string
	readonly p1: User
	readonly p2: User
	activePlayer: User
	status: GameStatus = 'pending'
	readonly board: Board = new Board()
	private moves = 0
	winner: Winner = null
	private readonly markers = new Map<User, Marker>();

	constructor(p1: User, p2: User) {
		this.id = crypto.randomUUID();
		this.p1 = p1,
		this.p2 = p2;
		
		const starter = Math.random() > 0.5 ? p1 : p2;

		this.activePlayer = starter
		this.markers.set(starter, 'X')
		this.markers.set(starter === p1 ? p2 : p1, 'O')
	}

	getMarker(p: User): Marker {
		const marker = this.markers.get(p)

		if(!marker) {
			throw new Error('Spieler nicht gefunden!')
		}

		return marker
	}

  start(): void {
    if (this.status !== 'pending') {
      throw new Error('Spiel kann nicht gestartet werden!');
    }

    this.status = 'active';
    return
  }

	move(player: User, field: number): void | GameDO {
    if (this.status !== 'active') {
      throw new Error('Spiel inaktiv!');
    }

    if (player.id !== this.activePlayer.id) {
      throw new Error('Nicht am Zug!');
    }

    const marker = this.getMarker(player);

		if(!marker) {
			throw new Error('Etwas ist schiefgelaufen!')
		}

    this.board.setField(field, marker);

    this.moves++;

    if (this.moves >= 5 && this.board.checkWin()) {
      this.winner = player;
      this.status = 'complete';
    }

    if (this.moves === 9) {
      this.winner = 'Unentschieden';
      this.status = 'complete';
    }

    this.switchPlayer();
  }

	cancel(): void {
    this.status = 'cancled';
  }

  private switchPlayer(): void {
    this.activePlayer =
      this.activePlayer.id === this.p1.id
        ? this.p2
        : this.p1;
  }

	getBoard() {
    return this.board.getBoard();
  }

  getMoveCount(): number {
    return this.moves;
  }

  getGameDO() {
    return {
      id: this.id,
      p1: {
        id: this.p1.id,
        name: this.p1.name,
        status: this.p1.status
      },
      p2: {
        id: this.p2.id,
        name: this.p2.name,
        status: this.p2.status,
      },
      status: this.status,
      board: this.getBoard(),
      activePlayerId: this.activePlayer.id,
      winner: this.winner,
    }
  }

  toJSON() {
    return this.getGameDO();
  }
}