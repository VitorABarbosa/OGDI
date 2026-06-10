import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { RevealController } from "./RevealController";

const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
}

beforeEach(() => {
  observe.mockClear();
  unobserve.mockClear();
  disconnect.mockClear();
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("RevealController", () => {
  it("observes reveal elements added after the controller mounts", async () => {
    render(<RevealController />);

    const lateElement = document.createElement("div");
    lateElement.className = "reveal";
    document.body.appendChild(lateElement);

    await waitFor(() => expect(observe).toHaveBeenCalledWith(lateElement));
  });
});
