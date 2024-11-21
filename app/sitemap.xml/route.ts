import { BrandService } from "@/services/brand";
import { NextResponse } from "next/server";

type Route = {
  url: string;
  lastModified: string;
  priority: string;
};

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const fetchRoutes = async (): Promise<Route[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const staticRoutes: Route[] = [
    { url: `${baseUrl}/`, lastModified: formatDate(new Date()), priority: "1" },
    { url: `${baseUrl}/search`, lastModified: formatDate(new Date()), priority: "0.9" },
  ];

  const brandRoute: Route[] = [];
  let pageNo = 1;
  while (1) {
    const dataList = (await BrandService.getBrandList({ pageNo, pageSize: 1000 }, true))?.payload;
    if (!dataList?.length) break;
    dataList.forEach((item) =>
      brandRoute.push({
        url: `${baseUrl}/brand/${item.brandNm}`,
        lastModified: formatDate(new Date()),
        priority: "0.8",
      })
    );
    pageNo++;
  }

  return [...staticRoutes, ...brandRoute];
};

const generateSitemap = (routes: Route[]) => {
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${routes
        .map(
          ({ url, lastModified, priority }) => `
        <url>
          <loc>${escapeXml(url)}</loc>
          <lastmod>${lastModified}</lastmod>
          <priority>${priority}</priority>
          <changefreq>weekly</changefreq>
        </url>
      `
        )
        .join("")}
    </urlset>`;
};

export async function GET() {
  const routes = await fetchRoutes();
  const sitemap = generateSitemap(routes);

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
