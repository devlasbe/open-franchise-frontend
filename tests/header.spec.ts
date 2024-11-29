import test, { expect } from "@playwright/test";

test.describe("헤더 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });
  test("카테고리 메뉴 테스트", async ({ page }) => {
    const header = page.locator("header");
    const menuList = header.locator("ul");
    const menuTextList = menuList.allTextContents();
    const largeCategoryList = ["외식", "서비스", "도소매"];

    await test.step("카테고리 메뉴 렌더링 여부", async () => {
      for (const largeCategory of largeCategoryList) {
        const isContain = (await menuTextList).some((text) => text.includes(largeCategory));
        expect(isContain).toBeTruthy();
      }
    });
  });
});
