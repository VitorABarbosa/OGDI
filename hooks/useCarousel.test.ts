import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useCarousel", () => {
  it("começa no índice 0", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    expect(result.current.index).toBe(0);
  });
  it("next dá wrap no fim", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.index).toBe(2);
    act(() => result.current.next());
    expect(result.current.index).toBe(0);
  });
  it("prev dá wrap no início", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.prev());
    expect(result.current.index).toBe(2);
  });
  it("goTo normaliza fora do range", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.goTo(5));
    expect(result.current.index).toBe(2); // 5 % 3 = 2
  });
  it("autoplay avança após o intervalo", () => {
    const { result } = renderHook(() => useCarousel({ length: 3, autoplayMs: 6500 }));
    act(() => { vi.advanceTimersByTime(6500); });
    expect(result.current.index).toBe(1);
  });
  it("dragEnd além do threshold avança", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.dragEnd(-200, 120));
    expect(result.current.index).toBe(1);
  });
  it("dragEnd aquém do threshold não muda", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.dragEnd(-10, 120));
    expect(result.current.index).toBe(0);
  });
});
