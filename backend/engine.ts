import { EventEmitter } from "node:events";
import { Game } from "./game";
import { User } from "./user";
import { GameDO, UserDO } from "../types/shared";

export class Engine extends EventEmitter {
  private users = new Map<string, User>();
  private games = new Map<string, Game>();

  addUser(user: User): void {
    this.users.set(user.id, user);

    this.updateLobby();
  }

  removeUser(user: User): void {
    this.users.delete(user.id);

    this.updateLobby();
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByConnectionId(connectionId: string): User | undefined {
    return [...this.users.values()].find(
      user => user.connectionId === connectionId
    );
  }

  getUserByName(name: string): User | undefined {
    return [...this.users.values()].find(
      user => user.name === name
    );
  }

  createGame(p1: User, p2: User): Game {
    const game = new Game(p1, p2);

    this.games.set(game.id, game);

    p1.setStatus('pending');
    p2.setStatus('pending');

    this.updateLobby();

    this.emit('game-created', {
      gameId: game.id
    });

    return game;
  }

  startGame(game: Game): void {
    game.start();

    game.p1.setStatus('ingame');
    game.p2.setStatus('ingame');

    this.updateLobby();

    this.emit('game-started', {
      gameId: game.id
    });
  }

  cancelGame(game: Game): void {
    game.cancel();

    game.p1.setStatus('active');
    game.p2.setStatus('active');

    this.updateLobby();

    this.emit('game-canceled', {
      gameId: game.id
    });
  }

  leaveGame(game: Game, player: User): void {
    player.setStatus('active');

    if (
      game.status === 'active' ||
      game.status === 'pending'
    ) {
      game.cancel();
    }

    if (player.id === game.p1.id) {
      game.p2.status = 'active';
    } else {
      game.p1.status = 'active';
    }

    this.updateLobby();

    this.emit('player left game', {
      gameId: game.id,
      playerId: player.id
    });
  }

  getGame(gameId: string): Game | undefined {
    return this.games.get(gameId);
  }

  findUserGame(user: User): GameDO | undefined {
    for (const game of this.games.values()) {
      const isPlayer =
        game.p1.id === user.id ||
        game.p2.id === user.id;

      if (game.status === 'active' && isPlayer) {
        return game.getGameDO();
      }
    }

    return undefined;
  }

  getLobby(): UserDO[] {
    const l = [...this.users.values()]
      .filter((user) =>
        user.status === 'active' ||
        user.status === 'pending'
      )
      .map((user) => ({
        id: user.id,
        name: user.name,
        status: user.status
      }));
    return l;
  }

  updateLobby(): void {
    this.emit('lobby-updated', {
      lobby: this.getLobby()
    });
  }
}