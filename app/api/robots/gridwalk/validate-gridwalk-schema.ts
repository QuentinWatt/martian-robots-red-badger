import { z } from "zod";

export const ValidateGridWalkSchema = z.object({
  gridSize: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(5, "Must be at most 5 characters")
    .regex(
      /^\d+\s\d+$/,
      "Must be in format 'X Y' (two numbers separated by a space)"
    ),
  robots: z.array(
    z.object({
      startPosition: z
        .string()
        .min(5, "Must be at least 3 characters")
        .max(5, "Must be at most 5 characters")
        .regex(
          /^\d+\s\d+\s[NESW]$/,
          "Must be in format 'X Y O' (two numbers separated by a space and a letter)"
        ),
      moves: z.string().min(1, "Must contain at least one instruction"),
    })
  ),
});
