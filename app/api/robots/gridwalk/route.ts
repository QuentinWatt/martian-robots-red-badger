import { NextRequest, NextResponse } from "next/server";
import { ValidateGridWalkSchema } from "./validate-gridwalk-schema";
import { parseRequestJSON } from "../../parse-request-json";

export async function POST(request: NextRequest) {
  const { data: body, error } = await parseRequestJSON(request);

  if (error) {
    return error;
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
