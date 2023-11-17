import { render, screen } from "@testing-library/react";
import ThoughtInput from "../app/ui/thought-input";
import userEvent from '@testing-library/user-event';

describe("Thought Input", () => {
  it("render the text area", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
  });
  
  it("adds 4 spaces instead of a tab", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea,'Hello{tab}world');

    expect(textarea.value).toBe("Hello    world");
  });

  
});
