import { NextRequest, NextResponse } from "next/server";

export async function parseRequestJSON(request: NextRequest) {
  try {
    return { data: await request.json(), error: null };
  } catch (error) {
    return {
      data: null,
      error: NextResponse.json(
        {
          message: "There was an error processing your request.",
          errors: ["Invalid JSON"],
        },
        { status: 400 }
      ),
    };
  }
}
