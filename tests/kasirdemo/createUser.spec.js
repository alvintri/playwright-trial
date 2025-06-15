import { test, expect } from '@playwright/test';
import { login, generateRandomId, navigateToSection, waitForSuccessToast } from './utils/auth';


test('Success tambah user', async ({ page }) => {
    // Login using the utility function
    await login(page);
    
    // Navigate to user creation page
    await navigateToSection(page, 'pengguna');
    await page.getByRole('link', { name: 'tambah' }).click();
    await expect(page.locator('#root div').filter({ hasText: 'dashboard / pengguna / baru' }).nth(4)).toBeVisible();
    
    //Scenario input user data with random values
    const randomId = generateRandomId();
    let userName = `User-Kasir-${randomId}`;
    let userEmail = `user-kasir-${randomId}@gmail.com`;
    
    await page.getByRole('textbox', { name: 'nama' }).fill(userName);
    await page.getByRole('textbox', { name: 'email' }).fill(userEmail);
    await page.getByRole('textbox', { name: 'password' }).fill('12345');
    await page.getByRole('button', { name: 'simpan' }).click();
    
    // Wait for success toast notification
    await waitForSuccessToast(page);
    
    
    // Wait for the page to refresh and show the users list
    await page.waitForTimeout(2500);

    await page.getByRole('textbox', { name: 'cari' }).fill(userName);
    
    
    //Implement POM (Common function)
    //AI Agent untuk support
    
    await page.close();
});