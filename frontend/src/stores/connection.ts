import { atom } from "nanostores";
import type { Screen } from "../../../types/frontend";

export const $username = atom<string>('');
export const $userId = atom<string>('');
export const $connectionId = atom<string>('');
export const $connected = atom<boolean>(false);
export const $screen = atom<Screen>('login')
