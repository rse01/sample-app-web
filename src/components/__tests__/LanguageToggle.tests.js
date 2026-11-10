import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LanguageToggle from "../LanguageToggle";
import { LanguageProvider } from "../../i18n/LanguageContext";

describe("LanguageToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("switches the interface language and persists the selection", () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByTestId("language-toggle"));

    expect(screen.getByLabelText("Passer en anglais")).toBeInTheDocument();
    expect(window.localStorage.getItem("swag-labs-language")).toBe("fr");
    expect(document.documentElement.lang).toBe("fr");
  });
});
