import { render, screen } from "@testing-library/react";
import ThoughtPresent from "../app/ui/thought-present";
import userEvent from '@testing-library/user-event';
import { Thought } from "@prisma/client";
import Home from "@/app/home";

describe("Thought Input", () => {

  it("should render a text area and an open link", () => {

    const thought:Thought = {
      id:"1",
      thoughtString:"thought value",
      thoughtTimeline:"",
      createdAt:new Date(),
      updatedAt:new Date()
    }

    render(<ThoughtPresent thought={thought} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const openLink = screen.getByRole("link") as HTMLAnchorElement;

    expect(textarea).toBeInTheDocument();
    expect(openLink).toBeInTheDocument();
    expect(textarea.disabled).toBe(true);

  });

  const testCases = ["1","2","3"];
  testCases.forEach((id)=>{
    it("should link to the id of the thought", () => {

      const thought:Thought = {
        id:id,
        thoughtString:"thought value",
        thoughtTimeline:"",
        createdAt:new Date(),
        updatedAt:new Date()
      }
  
      render(<ThoughtPresent thought={thought} />);
  
      const openLink = screen.getByRole("link") as HTMLAnchorElement;
  
      expect(openLink.pathname).toBe(`/history/${id}/visit`);
  
    });
  
  })
 
  const thoughtCases = ["thought1","thought2","thought3"];
  thoughtCases.forEach((thoughtString)=>{
    it("should display the thought in a textarea", () => {

      const thought:Thought = {
        id:"1",
        thoughtString:thoughtString,
        thoughtTimeline:"",
        createdAt:new Date(),
        updatedAt:new Date()
      }
  
      render(<ThoughtPresent thought={thought} />);
  
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

      expect(textarea.value).toBe(thought.thoughtString);
    });
  
  });

  it("should render the thoughtstring of a thought", () => {

    const thought:Thought = {
      id:"1",
      thoughtString:"thought value",
      thoughtTimeline:"",
      createdAt:new Date(0),
      updatedAt:new Date()
    }

    render(<ThoughtPresent thought={thought} />);

    const dateArea = screen.getByTestId("date");

    expect(dateArea.textContent).toBe("Thu Jan 1 1970 01:00 AM");

  });

});