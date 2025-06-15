import { test, expect } from '@playwright/test';
import { login, generateRandomId, navigateToSection, waitForSuccessToast } from './utils/auth';

test('Success tambah produk', async ({ page }) => {
  // Login using the utility function
  await login(page);

  //Scenario input produk
  const randomId = generateRandomId();
  let namaVitamin = `Vitamin B-${randomId}`

  await navigateToSection(page, 'produk');
  await expect(page.getByRole('heading', { name: 'dashboard / produk' })).toBeVisible();
  await page.getByRole('link', { name: 'tambah' }).click();
  await page.getByRole('textbox', { name: 'nama' }).fill(namaVitamin);
  await page.getByRole('textbox', { name: 'deskripsi' }).fill('Vitamin yang diautomate');
  await page.getByRole('textbox', { name: 'harga beli' }).fill('1200');
  await page.getByRole('textbox', { name: 'harga jual' }).fill('1500');
  await page.getByRole('textbox', { name: 'stok' }).fill('10');
  await page.getByRole('textbox', { name: 'kategori' }).click();
  await page.getByRole('gridcell', { name: 'Umum' }).click();
  await page.getByRole('button', { name: 'simpan' }).click();
  await waitForSuccessToast(page);
  await page.getByRole('gridcell', { name: namaVitamin }).isVisible();
  
  //Implement POM (Common function)
  //AI Agent untuk support
});

test('gagal tambah produk', async ({ page }) => {
    // Login using the utility function
    await login(page);
  
    //Scenario input produk
    const randomId2 = generateRandomId();
    let namaVitamin = `Vitamin B-${randomId2}`
  
    await navigateToSection(page, 'produk');
    await expect(page.getByRole('heading', { name: 'dashboard / produk' })).toBeVisible();
    await page.getByRole('link', { name: 'tambah' }).click();
    await page.getByRole('textbox', { name: 'nama' }).fill(namaVitamin);
    await page.getByRole('textbox', { name: 'deskripsi' }).fill('Vitamin yang as');

    //Harga Jual tidak boleh kurang dari harga beli
    await page.getByRole('textbox', { name: 'harga beli' }).fill('1500');
    await page.getByRole('textbox', { name: 'harga jual' }).fill('1200');
    await page.getByRole('textbox', { name: 'stok' }).fill('10');
    await page.getByRole('textbox', { name: 'kategori' }).click();
    await page.getByRole('gridcell', { name: 'Umum' }).click();
    await page.getByRole('button', { name: 'simpan' }).click();
    
    //Implement POM (Common function)
    //AI Agent untuk support
  });