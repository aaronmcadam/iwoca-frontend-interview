import { test, expect } from "@playwright/test";

test("applications listing", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/iwoca/);
});

test("viewing more applications", async ({ page }) => {
  await page.goto("/");

  await page.waitForResponse(/applications/);

  // expect there to be 5 applications
  const listItemsBefore = await page.getByRole("listitem").all();
  expect(listItemsBefore).toHaveLength(5);

  // click the "Load more" button
  await page.getByRole("button", { name: "Load more" }).click();
  await page.waitForResponse(/applications/);

  // expect there to be 10 applications
  const listItemsAfter = await page.getByRole("listitem").all();
  expect(listItemsAfter).toHaveLength(10);
});

test("failing to load applications", async ({ page }) => {
  await page.route("/api/applications**", async (route) => {
    await route.fulfill({ status: 403 });
  });

  await page.goto("/");

  // expect to see an error message
  expect(await page.getByRole("alert")).toHaveText(
    /failed to load applications/i
  );
});