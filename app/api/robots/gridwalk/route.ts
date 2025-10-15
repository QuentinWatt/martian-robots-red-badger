import { NextRequest, NextResponse } from "next/server";
import { ValidateGridWalkSchema } from "./validate-gridwalk-schema";

export async function POST(request: NextRequest) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "There was an error processing your request.",
        errors: ["Invalid JSON"],
      },
      { status: 400 }
    );
  }

  const requestValidation = ValidateGridWalkSchema.safeParse(body);

  if (!requestValidation.success) {
    const errors = requestValidation.error.issues.map((err) => {
      const field = err.path.join(".") || "field";
      return { [field]: err.message };
    });

    return NextResponse.json(
      {
        message: "Invalid request data.",
        errors,
      },
      { status: 422 }
    );
  }

  return NextResponse.json({ data: requestValidation.data }, { status: 200 });
}
