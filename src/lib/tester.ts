import WhatsAppAPI from 'whatsapp-api-js';
import * as Messages from 'whatsapp-api-js/messages';
import type { ClientMessage } from 'whatsapp-api-js/types';

export default class WhatsAppTester {
	private Whatsapp: WhatsAppAPI;
	private from: string;
	private to: string;

	constructor(token: string, from: string, to: string) {
		this.from = from;
		this.to = to;
		this.Whatsapp = new WhatsAppAPI({
			token,
			secure: false
		});
	}

	private async send(message: ClientMessage) {
		const data = await this.Whatsapp.sendMessage(
			this.from,
			this.to,
			message,
			undefined,
			'user-tracking-id'
		);
		console.log(data);
		return data;
	}

	// #region Text

	text() {
		return this.send(new Messages.Text('Hello World!'));
	}

	// #endregion

	// #region Location

	location() {
		return this.send(new Messages.Location(51.5074, 0.1278, 'London', 'United Kingdom'));
	}

	// #endregion

	// #region Media

	audio() {
		return this.send(new Messages.Audio('https://samplelib.com/lib/preview/mp3/sample-3s.mp3'));
	}

	document() {
		return this.send(
			new Messages.Document(
				'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
				false,
				undefined,
				'not null'
			)
		);
	}

	image() {
		return this.send(new Messages.Image('https://i.imgur.com/3g7nmJC.png'));
	}

	imageWithCaption() {
		return this.send(new Messages.Image('https://i.imgur.com/3g7nmJC.png', false, 'Hello World!'));
	}

	sticker() {
		return this.send(
			new Messages.Sticker('https://upload.wikimedia.org/wikipedia/commons/f/fa/Logo_Icono.webp')
		);
	}

	video() {
		return this.send(new Messages.Video('https://samplelib.com/lib/preview/mp4/sample-5s.mp4'));
	}

	// #endregion

	// #region Interactive

	buttons() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionButtons(
					new Messages.Button('abc', 'ABC'),
					new Messages.Button('def', 'DEF')
				),
				new Messages.Body('Hello World!')
			)
		);
	}

	buttonsWithTextHeader() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionButtons(
					new Messages.Button('ghi', 'GHI'),
					new Messages.Button('jkl', 'JKL')
				),
				new Messages.Body('Hello World!'),
				new Messages.Header('Hello World!')
			)
		);
	}

	buttonsWithImageHeader() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionButtons(
					new Messages.Button('mno', 'MNO'),
					new Messages.Button('pqrs', 'PQRS')
				),
				new Messages.Body('Hello World!'),
				new Messages.Header(new Messages.Image('https://i.imgur.com/3g7nmJC.png'))
			)
		);
	}

	list() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionList(
					'Title',
					new Messages.ListSection(
						undefined,
						new Messages.Row('tuv', 'TUV'),
						new Messages.Row('wxyz', 'WXYZ')
					)
				),
				new Messages.Body('Hello World!')
			)
		);
	}

	listSections() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionList(
					'Title',
					new Messages.ListSection(
						'Header 1',
						new Messages.Row('abc', 'ABC'),
						new Messages.Row('def', 'DEF')
					),
					new Messages.ListSection(
						'Header 2',
						new Messages.Row('ghi', 'GHI'),
						new Messages.Row('jkl', 'JKL')
					)
				),
				new Messages.Body('Hello World!')
			)
		);
	}

	callToAction() {
		return this.send(
			new Messages.Interactive(
				new Messages.ActionCTA('Google', 'https://google.com'),
				new Messages.Body('Hello World!')
			)
		);
	}

	locationRequest() {
		return this.send(
			new Messages.Interactive(new Messages.ActionLocation(), new Messages.Body('Hello World!'))
		);
	}

	// #endregion

	// #region Contact

	contact() {
		return this.send(
			new Messages.Contacts([
				new Messages.Name('John', 'Doe'),
				new Messages.Address(
					'United States',
					'US',
					'FL',
					'Miami',
					'221B Baker Street',
					'33101',
					'Mystery'
				),
				new Messages.Phone('+123456789', 'Mystery', '123456789')
			])
		);
	}

	multiContact() {
		return this.send(
			new Messages.Contacts(
				[
					new Messages.Name('John Doe', 'John', 'Doe', undefined, 'Mr.', 'Jr.'),
					new Messages.Address(
						'United States',
						'US',
						'FL',
						'Miami',
						'221A Baker Street',
						'33101',
						'Mystery'
					),
					new Messages.Phone('+123456789', 'Mystery', '123456789')
				],
				[
					new Messages.Name('John Another Doe', 'John', 'Doe', 'Another'),
					new Messages.Birthday('1111', '12', '25'),
					new Messages.Organization('Heaven', 'Justice', "God's Son")
				],
				[
					new Messages.Name('John Last', 'John', 'Last'),
					new Messages.Email('fake@fake.fake'),
					new Messages.Url('https://fake.fake')
				]
			)
		);
	}

	// #endregion
}
