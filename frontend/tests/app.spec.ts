import { test, expect, APIRequestContext } from "@playwright/test";

// helper to reset backend database through testing endpoint
async function resetDatabase(request: APIRequestContext) {
  // use IPv4 address to avoid IPv6 connection issues
  const response = await request.post("http://127.0.0.1:8000/testing/reset");
  expect(response.ok()).toBeTruthy();
}

// helper to perform login with given credentials
async function login(page, username = "admin", password = "admin") {
  await page.fill('input[placeholder="Username"]', username);
  await page.fill('input[placeholder="••••••••"]', password);
  await page.click('button:has-text("Login")');
}

// helper to toggle theme button by aria-label or title
async function toggleTheme(page) {
  await page.click('button[title="Toggle Theme"]');
}

// run database reset before each test to ensure a clean state
test.beforeEach(async ({ request, page }) => {
  await resetDatabase(request);
  // navigate to frontend
  await page.goto("/");
});

// 1. login page elements and theme toggle
test("login page shows sign in form and theme toggle", async ({ page }) => {
  await expect(page.locator("text=Sign In")).toBeVisible();
  await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
  await expect(page.locator('input[placeholder="••••••••"]')).toBeVisible();
  await expect(page.locator('button[title="Toggle Theme"]')).toBeVisible();
});

// 2. invalid login shows error
test("invalid credentials show error message", async ({ page }) => {
  await login(page, "bad", "creds");
  await expect(page.locator("text=Invalid username or password")).toBeVisible();
});

// 3. successful login routes to main view
test("successful login displays todo list", async ({ page }) => {
  await login(page);
  await expect(page.locator("text=Enterprise Task Manager")).toBeVisible();
});

// 4. theme toggle persists on login page
test("theme toggle works on login screen", async ({ page }) => {
  const button = page.locator('button[title="Toggle Theme"]');
  await expect(button).toHaveText("🌙");
  await toggleTheme(page);
  await expect(button).toHaveText("☀️");
});

// 5. theme toggle on main page
test("theme toggle works after login", async ({ page }) => {
  await login(page);
  const button = page.locator('button[aria-label="Toggle Dark Mode"]');
  await expect(button).toHaveText("🌙");
  await toggleTheme(page);
  await expect(button).toHaveText("☀️");
});

// 6. logout returns to login page
test("logout brings user back to login", async ({ page }) => {
  await login(page);
  await page.click("text=Logout");
  await expect(page.locator("text=Sign In")).toBeVisible();
});

// 7. empty list shows "All caught up!"
test("empty todo list shows catch-up message", async ({ page }) => {
  await login(page);
  await expect(page.locator("text=All caught up!")).toBeVisible();
});

// 8. create category updates dropdown
test("creating a category adds it to the dropdown", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="New Category..."]', "Work");
  await page.click("text=Add Category");
  await expect(page.locator("select")).toContainText("Work");
});

// 9. add todo without category and check appearance
test("add todo with no category", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="What needs to be done?"]', "Buy milk");
  await page.click('button:has-text("Add")');
  await expect(page.locator("text=Buy milk")).toBeVisible();
  await expect(page.locator("text=Buy milk").locator("..")).not.toContainText(
    "Work",
  );
});

// 10. add todo with category
test("add todo and assign category", async ({ page }) => {
  await login(page);
  // create category first
  await page.fill('input[placeholder="New Category..."]', "Gym");
  await page.click("text=Add Category");

  await page.selectOption("select", { label: "Gym" });
  await page.fill(
    'input[placeholder="What needs to be done?"]',
    "Lift weights",
  );
  await page.click('button:has-text("Add")');

  const item = page.locator("text=Lift weights");
  await expect(item).toBeVisible();
  await expect(item.locator("..")).toContainText("Gym");
});

// 11. toggle completion status
test("toggle todo completion", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="What needs to be done?"]', "Task");
  await page.click('button:has-text("Add")');
  const checkbox = page.locator('input[type="checkbox"]');
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

// 12. delete a todo
test("delete a todo item", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="What needs to be done?"]', "Remove me");
  await page.click('button:has-text("Add")');
  await page.click('button[title="Delete Todo"]');
  await expect(page.locator("text=Remove me")).toHaveCount(0);
});

// 13. verify selecting category when creating todo
test("can select newly-created category when adding todo", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="New Category..."]', "Chores");
  await page.click("text=Add Category");
  await page.selectOption("select", { label: "Chores" });
  await page.fill('input[placeholder="What needs to be done?"]', "Sweep floor");
  await page.click('button:has-text("Add")');
  const item = page.locator("text=Sweep floor");
  await expect(item.locator("..")).toContainText("Chores");
});

// 14. error when adding blank todo
test("blank todo does not get added", async ({ page }) => {
  await login(page);
  await page.click('button:has-text("Add")');
  await expect(page.locator("text=All caught up!")).toBeVisible();
});

// 15. login fields clear after logout
test("login form inputs reset after logout", async ({ page }) => {
  await login(page);
  await page.click("text=Logout");
  await expect(
    page.locator('input[placeholder="Username"]').inputValue(),
  ).resolves.toBe("");
  await expect(
    page.locator('input[placeholder="••••••••"]').inputValue(),
  ).resolves.toBe("");
});

// Additional tests for coverage

// 16. create multiple todos and ensure count increments
test("multiple todos can be added", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="What needs to be done?"]', "A");
  await page.click('button:has-text("Add")');
  await page.fill('input[placeholder="What needs to be done?"]', "B");
  await page.click('button:has-text("Add")');
  await expect(page.locator("text=A")).toHaveCount(1);
  await expect(page.locator("text=B")).toHaveCount(1);
});

// 17. category creation resets newCatName input
test("category input is cleared after add", async ({ page }) => {
  await login(page);
  await page.fill('input[placeholder="New Category..."]', "Test");
  await page.click("text=Add Category");
  await expect(
    page.locator('input[placeholder="New Category..."]'),
  ).toHaveValue("");
});
