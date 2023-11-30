import { expect, test } from '@playwright/test';

test.describe('Test if the buttons work', () => {
	for (let i = 0; i < 16; i++) {
		test(`Button ${i + 1} works`, async ({ page }) => {
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
