import { render, screen } from "@testing-library/react";
import ThoughtPresent from "../app/ui/thought-present";
import userEvent from '@testing-library/user-event';
import { Thought } from "@prisma/client";
import Home from "@/app/home";

describe.only("Thought Input", () => {

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
 

});