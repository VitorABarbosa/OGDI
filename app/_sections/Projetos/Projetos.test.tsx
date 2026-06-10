import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Projetos } from "./Projetos";

describe("Projetos", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not start carousel drag when the pointer starts on a project CTA", () => {
    const setPointerCapture = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "setPointerCapture", {
      configurable: true,
      value: setPointerCapture,
    });

    render(<Projetos />);

    fireEvent.pointerDown(screen.getAllByRole("link", { name: /Conhe/i })[0], {
      pointerId: 1,
      clientX: 10,
    });

    expect(setPointerCapture).not.toHaveBeenCalled();
  });
});
