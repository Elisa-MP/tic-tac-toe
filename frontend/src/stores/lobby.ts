import { atom } from "nanostores";
import type { UserDO } from "../../../types/shared";

export const $lobby = atom<UserDO[]>([]);
