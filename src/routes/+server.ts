import WhatsAppAPI from 'whatsapp-api-js/middleware/web-standard';

import type { RequestHandler } from './$types';

const Whatsapp = new WhatsAppAPI({
	token: 'Fake',
	appSecret: ''
});

export const POST: RequestHandler = async ({ request }) => {
	return new Response(null, {
		status: await Whatsapp.handle_post(request)
	});
};
