const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });

    await page.goto('');
  });

  test('Login form is shown', async ({ page }) => {
    const usernameInput = await page.getByTestId('username');
    const passwordInput = await page.getByTestId('password');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen');
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
      });
  
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong');
  
        const errorDiv = await page.locator('.error');
        await expect(errorDiv).toContainText('wrong credentials');
      });
    });
  
    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen');
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
      });
  
      test('a new blog can be created', async ({ page }) => {
        await page.getByText('new blog').click();
        await page.getByPlaceholder('title').fill('Test Blog');
        await page.getByPlaceholder('author').fill('Author Name');
        await page.getByPlaceholder('url').fill('http://example.com');
        await page.getByText('add').click();
  
        const blog = await page.getByText('Test Blog');
        await expect(blog).toBeVisible();
      });
  
      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'Blog to Like', 'Author', 'http://like.com');
  
        await page.locator('.blog').filter({ hasText: 'Blog to Like' }).getByText('Show').click();
        const likeButton = await page.getByRole('button', { name: 'Like' });
        await likeButton.click();
  
        const blog = page.locator('.blog').filter({ hasText: 'Blog to Like' });
        const likes = blog.locator('text=Likes:');
        await expect(likes).toContainText('1');
      });
    });
  });
  