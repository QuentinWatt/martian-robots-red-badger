import { NextRequest, NextResponse } from "next/server";
import { ValidateGridWalkSchema } from "./validate-gridwalk-schema";
import { parseRequestJSON } from "../../parse-request-json";
import { handleGridWalk } from "./robotGridWalk";

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

  const results: string[] = handleGridWalk(
    requestValidation.data.gridSize,
    requestValidation.data.robots
  );

  return NextResponse.json({ data: results }, { status: 200 });
}
