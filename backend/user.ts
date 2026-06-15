type IUserStatus = 'active' | 'pending' | 'ingame'

export class User implements User {
	readonly id: string
	readonly name: string
	readonly connectionId: string
	status: IUserStatus

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
}