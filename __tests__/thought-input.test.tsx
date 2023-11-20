import { render, screen } from "@testing-library/react";
import ThoughtInput from "../app/ui/thought-input";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Thought Input", () => {
  beforeEach(() => {});

  ///test if the textarea could be rended
  it("render the text area", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
  });

  ///test the behavir of tab(4 spaces)
  it("adds 4 spaces instead of a tab", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "Hello{tab}world");

    expect(textarea.value).toBe("Hello" + " ".repeat(4) + "world");
  });

  it("adds 2 spaces instead of a tab, when only 2 empty spaces left", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(
      textarea,
      "0123456789".repeat(44) + "12345678" + "{tab}"
    );

    expect(textarea.value).toBe(
      "0123456789".repeat(44) + "12345678" + " ".repeat(2)
    );
  }, 10000);

  it("adds 4 spaces instead of a tab", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "{tab}");

    expect(textarea.value).toBe(" ".repeat(4));
  });

  ///test the behavir of enter(30 spaces)
  it("adds 30 spaces instead of an enter", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "{enter}");

    expect(textarea.value).toBe(" ".repeat(30));
  });

  ///test the behavir of enter(20 spaces)
  it("adds 30 minus existing string length spaces instead of an enter", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "0123456789{enter}");

    expect(textarea.value).toBe("0123456789" + " ".repeat(20));
  });

  it("adds 30 minus existing string length spaces on two consecutive lines", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "0123456789{enter}");
    await userEvent.type(textarea, "0123456789{enter}");

    expect(textarea.value).toBe(
      "0123456789" + " ".repeat(20) + "0123456789" + " ".repeat(20)
    );
  });

  ////test the change of the [thought, setThought] State
  it("updates the thought state on text input", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const testInput = "Test Thought";

    await userEvent.type(textarea, testInput);

    expect(textarea.value).toBe(testInput);
  });

  it("disables/enables the save button based on the disabled state", async () => {
    render(<ThoughtInput />);

    const saveButton = screen.getByRole("button", { name: "Save" });

    expect(saveButton).toBeDisabled();

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "New Thought");

    expect(saveButton).not.toBeDisabled();
  });
});
