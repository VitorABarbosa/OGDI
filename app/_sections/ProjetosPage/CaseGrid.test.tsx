import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CaseGrid } from "./CaseGrid";

describe("CaseGrid", () => {
  it("renders all 5 projects by default", () => {
    render(<CaseGrid />);

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });

  it("marks project cards for scroll reveal animation", () => {
    render(<CaseGrid />);

    const card = screen.getByText("Start Park Jabaquara").closest("a");

    expect(card).toHaveClass("reveal", "reveal-card");
  });

  it('filters to 3 obra projects when "Em obra" tab is clicked', () => {
    render(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.queryByText("Hits Santa Catarina")).not.toBeInTheDocument();
    expect(screen.queryByText("Guarulhos")).not.toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });

  it('returns to 5 projects when "Todos" tab is clicked after filtering', () => {
    render(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));
    fireEvent.click(screen.getByRole("button", { name: /Todos/i }));

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });
});
