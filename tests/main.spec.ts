import test, { expect } from "@playwright/test";

test.describe("메인 페이지 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });
  test("랭크 요소 테스트", async ({ page }) => {
    const rankTitleList = page.locator("#rank-title");
    const rankItemList = page.locator("#rank-item");
    const firstRankTitle = rankTitleList.first();
    const firstRankItem = rankItemList.first();

    await test.step("랭크 타이틀 존재 여부", async () => {
      const titleLocator = firstRankTitle.locator("text=/.*\\sTOP10/i");
      await expect(titleLocator).toBeVisible();
    });

    await test.step("랭크 아이템 클릭시 페이지 이동 여부", async () => {
      const firstRankItemBrandName = await firstRankItem.locator("p").nth(2).innerText();
      await firstRankItem.click();
      await expect(page).toHaveURL(`/brand/${firstRankItemBrandName}`);
    });
  });
});
