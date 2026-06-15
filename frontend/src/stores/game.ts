import { atom } from "nanostores";
import type { GameDO } from "../../../types/shared";

export const $isMyTurn = atom(false);
export const $game = atom<GameDO | null>(null)