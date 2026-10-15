import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page Integration", () => {
  it("renders the page layout including Header with square logo, Calculator, and Footer", () => {
    const { container } = render(<Home />);

    // Header brand badge with square logo
    const brand = screen.getByText("White Code Labs");
    expect(brand).toBeDefined();

    const svg = brand.closest("span.inline-flex")?.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 38 35");

    // Header title
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /workload & labor-cost/i,
      })
    ).toBeDefined();

    // Steps
    expect(screen.getByText("Enter your figures")).toBeDefined();
    expect(screen.getByText("Adjust automation")).toBeDefined();
    expect(screen.getByText("Review estimate")).toBeDefined();

    // Calculator inputs
    expect(container.querySelector("#newClients-input")).not.toBeNull();
    expect(container.querySelector("#activeClients-input")).not.toBeNull();
    expect(container.querySelector("#hourlyRate-input")).not.toBeNull();

    // Assumptions section
    expect(screen.getByText(/assumptions and limitations/i)).toBeDefined();

    // Footer
    expect(
      screen.getByText(/© 2026 White Code Labs\. All rights reserved\./i)
    ).toBeDefined();
  });

  it("renders valid schema.org WebApplication structured data", () => {
    const { container } = render(<Home />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const json = JSON.parse(script?.innerHTML || "{}");
    expect(json["@type"]).toBe("WebApplication");
    expect(json.creator.name).toBe("White Code Labs");
    expect(json.publisher.name).toBe("White Code Labs");
  });
});
