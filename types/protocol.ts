import type { UserDO, GameDO, Screen } from './shared';

interface IMessage<Type, Payload> {
  id: string,
  type: Type,
  payload: Payload,
}

export enum IMessageType {
	HELLO = 'hello',
	SET_USERNAME = 'set-username',
	ACCEPT_INVITE = 'accept-invite',
	REJ_INVITE = 'rej-invite',
	CREATE_GAME = 'create-game',
	GAME_MOVE = 'game-move',
	LEAVE_GAME = 'leave-game',

	WELCOME = 'welcome',
	ACK = 'ack',
	REJ = 'rej',
	UPDATE_LOBBY = 'update-lobby',
	GAME_INVITE = 'game-invite',
	GAME_START = 'game-start',
	UPDATE_BOARD = 'update-board',
	OPP_LEFT_GAME = 'opponent-left-game',
}

// Client

export type TClientMsg =
	Hello
	| ISetUsername
	| IAcceptInvite
	| IRejectInvite
	| ICreateGame
	| IGameMove
	| ILeaveGame
;

export type Hello = IMessage<
	IMessageType.HELLO,
	{
		connectionId?: string,
	}
>;

export type ISetUsername = IMessage<
	IMessageType.SET_USERNAME,
	{
		username: string,
		connectionId: string,
	}
>;

export type IAcceptInvite = IMessage<
	IMessageType.ACCEPT_INVITE,
	{
		gameId: string,
	}
>;

export type IRejectInvite = IMessage<
	IMessageType.REJ_INVITE,
	{
		gameId: string,
	}
>;

export type ICreateGame = IMessage<
	IMessageType.CREATE_GAME,
	{
		opponentId: string,
	}
>;

export type IGameMove = IMessage<
	IMessageType.GAME_MOVE,
	{
		gameId: string,
		field: number,
	}
>;

export type ILeaveGame = IMessage<
	IMessageType.LEAVE_GAME,
	{
		gameId: string,
	}
>;

// Server

export type TServerMsg =
	IWelcome
	| IACK
	| IREJ
	| IUpdateLobby
	|	IGameInvite
	| IGameStart
	| IUpdateBoard
	| IOppLeftGame
;

export type IWelcome = IMessage<
	IMessageType.WELCOME,
	{
		msg: string,
		connectionId: string,
		userId?: string,
		targetScreen?: Screen,
		game?: GameDO
	}
>;

export type IACK = IMessage<
	IMessageType.ACK,
	{
		reqId: string,
		message?: string,
		userId?: string,
	}
>;
export type IREJ = IMessage<
	IMessageType.REJ,
	{
		reqId: string,
		error?: string,
	}
>;

export type IUpdateLobby = IMessage<
	IMessageType.UPDATE_LOBBY,
	{
		lobby: UserDO[],
	}
>;

export type IGameInvite = IMessage<
	IMessageType.GAME_INVITE,
	{
		game: GameDO,
	}
>;

export type IGameStart = IMessage<
	IMessageType.GAME_START,
	{
		game: GameDO,
	}
>;

export type IUpdateBoard = IMessage<
	IMessageType.UPDATE_BOARD,
	{
		game: GameDO,
	}
>;

export type IOppLeftGame = IMessage<
	IMessageType.OPP_LEFT_GAME,
	{
		gameId: string;
	}
>;
