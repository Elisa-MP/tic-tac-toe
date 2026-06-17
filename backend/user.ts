type IUserStatus = 'active' | 'pending' | 'ingame'

export class User implements User {
	readonly id: string
	readonly name: string
	readonly connectionId: string
	status: IUserStatus
	private selfdestruct: NodeJS.Timeout | undefined

	constructor(name: string, connectionId: string) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.connectionId = connectionId;
		this.status = 'active';
	}

	setStatus(status: IUserStatus) {
		this.status = status;
	}

	getConnectionId(): string {
		return this.connectionId;
	}

	setSelfdestruct(timeout: NodeJS.Timeout) {
		this.selfdestruct = timeout
	}

	survive() {
		if(this.selfdestruct) {
			clearTimeout(this.selfdestruct)
			this.selfdestruct = undefined
		}
	}
}