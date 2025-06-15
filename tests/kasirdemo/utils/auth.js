/**
 * Utility functions for Kasir Demo tests
 */
const { expect } = require('@playwright/test');

/**
 * Login to the Kasir Demo application
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {Object} options - Login options
 * @param {string} options.email - Email to use for login (default: '1747212578-toko5@gmail.com')
 * @param {string} options.password - Password to use for login (default: 'password123')
 * @param {boolean} options.assertSuccess - Whether to assert successful login (default: true)
 * @returns {Promise<void>}
 */
async function login(page, options = {}) {
  const {
    email = '1747212578-toko5@gmail.com',
    password = 'password123',
    assertSuccess = true
  } = options;

  await page.goto('https://kasirdemo.vercel.app/login');
  await page.getByRole('textbox', { name: 'email' }).fill(email);
  await page.getByRole('textbox', { name: 'password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();
  
  if (assertSuccess) {
    await expect(page.getByRole('heading', { name: 'kasirAja' })).toBeVisible();
  }
}

/**
 * Generate a random ID string for test data
 * @param {number} length - Length of the random ID (default: 4)
 * @returns {string} - Random ID string
 */
function generateRandomId(length = 4) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

/**
 * Navigate to a specific section in the application
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} section - Section name to navigate to (e.g., 'pengguna', 'produk')
 * @returns {Promise<void>}
 */
async function navigateToSection(page, section) {
  await page.getByRole('link', { name: section }).click();
}

/**
 * Wait for toast notification and validate success message
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} message - Expected message text (default: 'item ditambahkan')
 * @returns {Promise<void>}
 */
async function waitForSuccessToast(page, message = 'item ditambahkan') {
  await expect(page.locator('#chakra-toast-manager-top-right').getByRole('alert', { name: 'success' })).toBeVisible();
  await page.locator('#chakra-toast-manager-top-right').getByText(message).click();
}

module.exports = {
  login,
  generateRandomId,
  navigateToSection,
  waitForSuccessToast
};
