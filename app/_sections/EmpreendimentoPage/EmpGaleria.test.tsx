import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpGaleria } from "./EmpGaleria";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");

describe("EmpGaleria", () => {
  it("renders Cupece images and opens a smooth fullscreen viewer", async () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });
    expect(imageButtons).toHaveLength(9);

    fireEvent.click(imageButtons[0]);

    expect(screen.getByRole("dialog", { name: /Cine Open/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
