export interface EmailData {
	id: string;
	to: string;
	subject: string;
	body: string;
	createdAt: Date;
}

export class Email {
	constructor(private readonly data: EmailData) { }

	getEmailData() {
		return this.data;
	}
}
