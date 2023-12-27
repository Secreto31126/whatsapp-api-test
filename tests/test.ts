import { expect, test } from '@playwright/test';

const button_names = [
	'Text',
	'Location',
	'Audio',
	'Document',
	'Image',
	'Image with Caption',
	'Sticker',
	'Video',
	'Buttons',
	'Buttons with Text Header',
	'Buttons with Image Header',
	'List',
	'List with Sections',
	'CTA',
	'Location Request',
	'Contact',
	'Multi Contact'
];

test.describe('Test if the buttons work', () => {
	for (let i = 0; i < 17; i++) {
		test(`Button ${button_names[i]} works`, async ({ page }) => {
			await page.goto('/');
			await page.waitForTimeout(500);

			await page.getByPlaceholder('Token').fill(process.env.TOKEN as string);
			await page.getByPlaceholder('From (phoneID)').fill(process.env.FROM as string);
			await page.getByPlaceholder('To (phone)').fill(process.env.TO as string);

			const button = (await page.$$(`button`))[i];
			if (!button) throw new Error('Button not found');
			await button.click();

			const response = await page.waitForResponse('https://graph.facebook.com/**', {
				timeout: 5000
			});
			expect(response.ok()).toBeTruthy();

			await page.waitForTimeout(1000);
		});
	}
});
