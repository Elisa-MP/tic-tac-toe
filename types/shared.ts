export type Screen = 'login' | 'lobby' | 'game'

export type UserStatus = 'active' | 'pending' | 'ingame';
export type Marker = 'X' | 'O' | null;

export type GameStatus = 'pending' | 'active' | 'complete' | 'cancled'
export type Winner = UserDO | 'Unentschieden' | null

export type UserDO = {
	id: string,
	name: string,
	status: UserStatus,
}

export type GameDO = Readonly<{
  id: string
  p1: UserDO
  p2: UserDO
  status: GameStatus
  board: readonly Marker[]
  activePlayerId: string
  winner: Winner
}>