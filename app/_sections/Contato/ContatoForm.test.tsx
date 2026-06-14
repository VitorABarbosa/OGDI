import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithIntl } from "@/test/intl";
import { ContatoForm } from "./ContatoForm";

describe("ContatoForm", () => {
  it("ao enviar, esconde o form e mostra a mensagem de sucesso", () => {
    renderWithIntl(<ContatoForm />);
    fireEvent.submit(screen.getByRole("form", { name: /contato/i }));
    expect(screen.getByText("Mensagem recebida.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Nome")).not.toBeInTheDocument();
  });
});
