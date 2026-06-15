import type { TClientMsg, TServerMsg } from "../types/protocol"

export const genMsg = (msg: TClientMsg | TServerMsg) => {
	const { id, type, payload } = msg;
	return JSON.stringify({
		'id': id,
		'type': type,
		'payload': payload,
	})
}

