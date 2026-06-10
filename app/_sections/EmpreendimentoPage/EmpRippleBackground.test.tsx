import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { EmpRippleBackground } from "./EmpRippleBackground";

describe("EmpRippleBackground", () => {
  it("renders decorative ripple layers for the project detail page background", () => {
    const { container } = render(<EmpRippleBackground />);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("[data-ripple-drop]")).toHaveLength(4);
  });
});
