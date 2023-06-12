import { test, expect } from "@playwright/test";

test("applications listing", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/iwoca/);
});
