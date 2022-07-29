import type { RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';
import { DateTime } from 'luxon';

export const get: RequestHandler = async () => {
	const auth = await google.auth.getClient({
		projectId: process.env.GOOGLE_PROJECT_ID,
		credentials: {
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
	});
	const sheets = google.sheets({ version: 'v4', auth });
	const range = `Pozo de Oportunidades!B8:M`;
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.GOOGLE_SHEET_ID,
		range
	});

	const opportunities = response.data.values.map((rawData, index) => {
		const [
			title,
			description,
			createdBy,
			owner,
			client,
			status,
			priority,
			difficulty,
			stakeholders,
			phoneNumber,
			createdAt,
			fileUrl
		] = rawData;

		return {
			title,
			description,
			createdBy,
			owner,
			client,
			status,
			priority,
			difficulty,
			stakeholders,
			id: index,
			phoneNumber,
			createdAt: DateTime.fromFormat(createdAt, 'dd/MM/yyyy').toJSDate(),
			fileUrl
		};
	});

	return { body: { opportunities } };
};
