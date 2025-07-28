interface EmailData {
	id: string;
	to: string;
	subject: string;
	body: string;
	createdAt: Date;
}

export class Email {
	constructor(public readonly data: EmailData) { }
}
