import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { IntroVideo } from "./IntroVideo";

beforeEach(() => {
  document.body.className = "";
  sessionStorage.clear();
  window.__introDone = false;
  window.scrollTo = vi.fn();
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});

describe("IntroVideo", () => {
  it("skips the intro after it has already played in the current tab", async () => {
    sessionStorage.setItem("ogdi:intro-played", "1");

    const { container } = render(<IntroVideo />);

    await waitFor(() => expect(container.querySelector("video")).not.toBeInTheDocument());
    expect(window.__introDone).toBe(true);
    expect(document.body.classList.contains("overflow-hidden")).toBe(false);
  });
});
