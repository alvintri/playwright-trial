import { test, expect } from '@playwright/test';


test.describe('Scenario Register', () => {
    test('Register berhasil', async ({ page }) => {
        await page.goto("https://kasirdemo.vercel.app")
        await page.locator("//a[@href='/register']").click()
    })
    test('Validasi label tombol', async ({ page }) => {
        //Buka browser
        //Arahin ke kasirdemo.vercel.app
    
        await page.goto("https://kasirdemo.vercel.app")
    
        await page.getByRole('link', { name: 'ingin mencoba, daftar ?' }).click()
    
        let nameLabel = await page.locator("#name-label").textContent()
        //Assert
        expect(nameLabel).toBe("nama toko")
    })    
})