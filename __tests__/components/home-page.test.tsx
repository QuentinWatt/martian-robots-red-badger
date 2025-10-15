import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Component", () => {
  it("should render the home page H1", () => {
    render(<Home />);
    const element = screen.getByText(/Martian Robots/i);
    expect(element).toBeDefined();
  });
});
