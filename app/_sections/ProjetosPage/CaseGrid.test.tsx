import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CaseGrid } from "./CaseGrid";

// CaseCard renders project names in a <div class="font-serif ..."> — query by text.
// "Cupecê" is a substring of "Hits Cupecê", so we use exact:true (the default) when
// looking for the standalone "Cupecê" card to avoid false positives.

describe("CaseGrid", () => {
  it("renders all 6 projects by default", () => {
    render(<CaseGrid />);
    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    // "Cupecê" (exact) should appear exactly once — the futuro card.
    // "Hits Cupecê" is a separate node and will not match exact "Cupecê".
    expect(screen.getByText("Cupecê")).toBeInTheDocument();
  });

  it('filters to 3 obra projects when "Em obra" tab is clicked', () => {
    render(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));

    // Obra projects present
    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();

    // Non-obra projects absent
    expect(screen.queryByText("Hits Santa Catarina")).not.toBeInTheDocument();
    expect(screen.queryByText("Guarulhos")).not.toBeInTheDocument();

    // The futuro "Cupecê" card (exact) must be absent.
    // After filtering, "Hits Cupecê" is still present — but querying exact "Cupecê"
    // should return null because the node that contains only "Cupecê" is gone.
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });

  it('returns to 6 projects when "Todos" tab is clicked after filtering', () => {
    render(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));
    fireEvent.click(screen.getByRole("button", { name: /Todos/i }));

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    expect(screen.getByText("Cupecê")).toBeInTheDocument();
  });
});
