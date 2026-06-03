import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("junta classes verdadeiras e ignora falsas", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("mescla condicionais", () => {
    expect(cn("base", { active: true, off: false })).toBe("base active");
  });
});
