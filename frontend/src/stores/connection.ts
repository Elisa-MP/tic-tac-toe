import { atom } from "nanostores";
import type { Screen } from "../../../types/shared";

const storedConnectionId = localStorage.getItem('connectionId') ?? '';

export const $userId = atom<string>('');
export const $connectionId = atom<string>(storedConnectionId);
export const $screen = atom<Screen>('login')
