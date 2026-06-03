import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContatoForm } from "./ContatoForm";

describe("ContatoForm", () => {
  it("ao enviar, esconde o form e mostra a mensagem de sucesso", () => {
    render(<ContatoForm />);
    fireEvent.submit(screen.getByRole("form", { name: /contato/i }));
    expect(screen.getByText("Mensagem recebida.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Nome")).not.toBeInTheDocument();
  });
});
