import { test, expect } from '@playwright/test';

test('Login berhasil', async ({ page }) => {
  await page.goto('https://kasirdemo.vercel.app/login');
  await page.getByRole('textbox', { name: 'email' }).fill('1747212578-toko5@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('password123');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByRole('heading', { name: 'kasirAja' })).toBeVisible();

  await page.close()
});

test('Login Salah Kredensial', async ({ page }) => {
    await page.goto('https://kasirdemo.vercel.app/login');
    await page.getByRole('textbox', { name: 'email' }).fill('123134@gmail.com');
    await page.getByRole('textbox', { name: 'password' }).fill('1231321');
    await page.getByRole('button', { name: 'login' }).click();

    //assertion
    await expect(page.getByRole('alert')).toContainText('Kredensial yang Anda berikan salah');
    await expect(page.getByRole('alert')).toMatchAriaSnapshot(`
        - alert:
          - img
          - text: Kredensial yang Anda berikan salah
        `)
    page.close()
})

