import { NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/analyze-url";
import { isValidUrl } from "@/lib/validate-url";
import { normalizeUrl } from "@/lib/normalize-url";
import { domainExists } from "@/lib/dns-check";

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

    const normalizedUrl =
      normalizeUrl(inputUrl);

    if (
      !isValidUrl(normalizedUrl)
    ) {
      return NextResponse.json(
        {
          error:
            "URL tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      analyzeUrl(normalizedUrl);

    const hostname =
  new URL(normalizedUrl).hostname;

const exists =
  await domainExists(
    hostname
  );

  if (!exists) {
  result.status =
    "suspicious";

  result.score += 40;

  result.reasons.push(
    "Domain tidak ditemukan."
  );
}

    return NextResponse.json({
      url: normalizedUrl,
      result,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan.",
      },
      {
        status: 500,
      }
    );
  }
}