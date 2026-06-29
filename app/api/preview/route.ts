import { NextResponse } from "next/server";
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
      await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(
          url
        )}`
      );

    const data =
      await response.json();

    if (!data.status ||
        data.status !== "success") {
      throw new Error(
        "Preview tidak tersedia."
      );
    }

    return NextResponse.json({
      title:
        data.data.title ?? "",
      description:
        data.data.description ?? "",
      image:
        data.data.image?.url ??
        null,
      url,
    });
  } catch (error) {
    console.error(
      "Preview Error:",
      error
    );

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