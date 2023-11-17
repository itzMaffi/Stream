import { render, screen } from "@testing-library/react";
import ThoughtInput from "../app/ui/thought-input";
import userEvent from '@testing-library/user-event';

describe("Thought Input", () => {

  beforeEach(()=>
  {


  });
  it("render the text area", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
  });
  
  it("adds 4 spaces instead of a tab", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea,'Hello{tab}world');

    expect(textarea.value).toBe("Hello" +" ".repeat(4)+"world");
  });

  it("adds 30 spaces instead of an enter", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea,'{enter}');

    expect(textarea.value).toBe(" ".repeat(30));
  });

  it("adds 30 minus existing string length spaces instead of an enter", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea,'0123456789{enter}');

    expect(textarea.value).toBe('0123456789'+" ".repeat(20));
  });

  it("adds 30 minus existing string length spaces on two consecutive lines", async () => {
    render(<ThoughtInput />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea,'0123456789{enter}');
    await userEvent.type(textarea,'0123456789{enter}');

    expect(textarea.value).toBe('0123456789'+" ".repeat(20)+'0123456789'+" ".repeat(20));
  });

});
