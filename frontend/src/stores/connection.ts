import { atom } from "nanostores";
import type { Screen } from "../../../types/frontend";

const storedConnectionId = localStorage.getItem('connectionId') ?? '';

export const $username = atom<string>('');
export const $userId = atom<string>('');
export const $connectionId = atom<string>(storedConnectionId);
export const $connected = atom<boolean>(false);
export const $screen = atom<Screen>('login')
