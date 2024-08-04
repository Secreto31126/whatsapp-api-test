// import { WhatsAppAPI } from 'whatsapp-api-js/middleware/sveltekit';
import { WhatsAppAPI } from 'whatsapp-api-js';
import { Text } from 'whatsapp-api-js/messages';

import type { RequestHandler } from './$types';

const Whatsapp = new WhatsAppAPI<number>({
	token: 'Fake',
	appSecret: '',
	v: 'v19.0'
});

Whatsapp.on.message = ({ offload, reply, name }) => {
	offload(() => reply(new Text(name ?? 'Unknown')));
	return 200;
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const payload = JSON.parse(body);
	const signature = request.headers.get('x-hub-signature-256') ?? '';

	let status;
	try {
		status = await Whatsapp.post(payload, body, signature);
	} catch (e) {
		status = e as number;
	}

	return new Response(null, {
		status
	});
};
