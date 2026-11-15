import { expect, test } from "@playwright/test";

const routes = [
  {
    path: "/",
    slug: "home",
    heading: /More affordable dialysis/,
    shareTitle: "More affordable dialysis. Powered by the sun.",
  },
  {
    path: "/about",
    slug: "about",
    heading: "A safe place for dialysis care",
    shareTitle: "A safe place for dialysis care",
  },
  {
    path: "/programs",
    slug: "programs",
    heading: "Kidney care beyond each session",
    shareTitle: "Kidney care beyond each session",
  },
  {
    path: "/model",
    slug: "model",
    heading: "Lower delivery costs. Greater access.",
    shareTitle: "Lower delivery costs. Greater access.",
  },
  {
    path: "/partners",
    slug: "partners",
    heading: "Help make affordable kidney care possible",
    shareTitle: "Help make affordable kidney care possible",
  },
  {
    path: "/news",
    slug: "news",
    heading: "News & progress",
    shareTitle: "News and progress from Ghana",
  },
  {
    path: "/faq",
    slug: "faq",
    heading: "Frequently asked questions",
    shareTitle: "Questions about NephroHaven",
  },
  { path: "/privacy", slug: "privacy", heading: "Privacy policy", shareTitle: "Privacy policy" },
  { path: "/terms", slug: "terms", heading: "Terms of service", shareTitle: "Terms of service" },
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const resetKey = "nephrohaven-e2e-reset";
    if (sessionStorage.getItem(resetKey)) return;
    localStorage.removeItem("nephrohaven-consent");
    sessionStorage.setItem(resetKey, "1");
  });
});

for (const route of routes) {
  test(`${route.path} renders with security headers`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.ok()).toBe(true);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(page.getByRole("link", { name: "Privacy", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Terms", exact: true })).toBeVisible();
    const canonical = route.path === "/" ? /https?:\/\/[^/]+\/?$/ : new RegExp(`${route.path}$`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      new RegExp(`/og/${route.slug}$`),
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      route.shareTitle,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const html = await page.content();
    expect(html).toContain("application/ld+json");
    expect(html).toContain(route.shareTitle);
    if (route.slug === "faq") expect(html).toContain("FAQPage");
  });
}

test("about leadership bio opens from the card", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "Advisory board" })).toBeVisible();
  await page.getByRole("button", { name: /Bernard Abeiku Mensah/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Cape Coast Teaching Hospital/)).toBeVisible();
});

test("faq answer opens from the question", async ({ page }) => {
  await page.goto("/faq");
  await page.locator("summary", { hasText: "What is NephroHaven Foundation?" }).click();
  await expect(page.getByText("Founded by a nurse, the foundation")).toBeVisible();
});

test("mobile menu reaches an interior page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "About us" }).click();
  await expect(page).toHaveURL("/about");
  await expect(
    page.getByRole("heading", { level: 1, name: "A safe place for dialysis care" }),
  ).toBeVisible();
});

test("declining analytics keeps third-party scripts unloaded", async ({ page }) => {
  const urls: string[] = [];
  page.on("request", (request) => urls.push(request.url()));
  await page.goto("/");
  const notice = page.getByRole("region", { name: "Cookies on this site" });
  await expect(notice).toBeVisible();
  await notice.getByRole("button", { name: "Decline" }).click();
  await expect(notice).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("nephrohaven-consent")))
    .toBe("declined");
  expect(urls.join("\n")).not.toMatch(/posthog|googletagmanager|google-analytics/);

  await page.reload();
  await expect(notice).toBeHidden();
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await expect(notice).toBeVisible();
  await expect(page.getByText("Analytics are off.")).toBeVisible();
});

test("accepting analytics records the choice without a provider key", async ({ page }) => {
  const urls: string[] = [];
  page.on("request", (request) => urls.push(request.url()));
  await page.goto("/privacy");
  const notice = page.getByRole("region", { name: "Cookies on this site" });
  await notice.getByRole("button", { name: "Accept" }).click();
  await expect(notice).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("nephrohaven-consent")))
    .toBe("accepted");
  expect(urls.join("\n")).not.toMatch(/posthog|googletagmanager|google-analytics/);
  await expect(page.getByRole("heading", { level: 1, name: "Privacy policy" })).toBeVisible();
  await expect(page.getByText("does not provide medical advice")).toBeVisible();
});

test("sitemap, robots, and share images cover every page", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const route of routes) expect(xml).toContain(`/og/${route.slug}`);

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("/sitemap.xml");

  for (const slug of ["home", "about", "privacy"]) {
    const image = await request.get(`/og/${slug}`);
    expect(image.ok()).toBe(true);
    expect(image.headers()["content-type"]).toContain("image/png");
    expect((await image.body()).byteLength).toBeGreaterThan(5000);
  }
});
