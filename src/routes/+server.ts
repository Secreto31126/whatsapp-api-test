import WhatsAppAPI from 'whatsapp-api-js/middleware/web-standard';

import type { RequestHandler } from './$types';

const Whatsapp = new WhatsAppAPI({
	token: 'Fake',
	appSecret: ''
});

export const POST: RequestHandler = async ({ request }) => {
	return new Response(null, {
		status: await Whatsapp.handle_post(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore - Unfortunately, undici request type and SvelteKit request type are not fully compatible
			request
		)
	});
};
