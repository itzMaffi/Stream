import { render, screen } from "@testing-library/react";
import ThoughtInput from "../app/ui/thought-input";

describe("Home", () => {
  it("renders a heading", () => {
    render(<ThoughtInput />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
