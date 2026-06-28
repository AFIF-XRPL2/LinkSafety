import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { normalizeUrl } from "@/lib/normalize-url";
import { isValidUrl } from "@/lib/validate-url";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const inputUrl = body.url;

    if (!inputUrl) {
      return NextResponse.json(
        {
          error: "URL wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const url =
      normalizeUrl(inputUrl);

    if (!isValidUrl(url)) {
      return NextResponse.json(
        {
          error: "URL tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0",
        },
      });

    if (!response.ok) {
  console.log(
    "Status:",
    response.status
  );

  console.log(
    "Status Text:",
    response.statusText
  );

  throw new Error(
    `Website tidak dapat diakses. Status ${response.status}`
  );
}

    console.log(
  "Status:",
  response.status
);

console.log(
  "Content-Type:",
  response.headers.get(
    "content-type"
  )
);

    const html =
      await response.text();

    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr(
        "content"
      ) ||
      $("title").text() ||
      "";

    const description =
      $(
        'meta[property="og:description"]'
      ).attr("content") ||
      $('meta[name="description"]').attr(
        "content"
      ) ||
      "";

    const image =
      $('meta[property="og:image"]').attr(
        "content"
      ) || null;

    return NextResponse.json({
      title,
      description,
      image,
      url,
    });
  } catch (error) {
  console.error("Preview Error:", error);

  return NextResponse.json(
      {
        error:
          "Gagal mengambil preview website.",
      },
      {
        status: 500,
      }
    );
  }
}