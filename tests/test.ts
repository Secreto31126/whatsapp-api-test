import { expect, test } from '@playwright/test';

test('All the messages are sent as expected', async ({ page }) => {
	await page.goto('/');
	await page.fill('input#token', process.env.TOKEN as string);
	await page.fill('input#from', process.env.FROM as string);
	await page.fill('input#to', process.env.TO as string);

	for (const button of await page.$$('button')) {
		await button.click();
		const response = await page.waitForResponse('https://graph.facebook.com/**');
		const json = await response.json();
		expect(json).toBeOK();
		await page.waitForTimeout(2000);
	}
});
