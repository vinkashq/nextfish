import { test, expect } from '@playwright/test';

test.describe('CI tests', () => {
  test('should pass', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should return health check', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/health');
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('should redirect /admin to login page when not logged in', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
