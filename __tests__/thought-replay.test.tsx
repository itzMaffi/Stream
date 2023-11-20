import { render, screen } from "@testing-library/react";
import ThoughtReplay from "../app/ui/thought-replay";
import userEvent from '@testing-library/user-event';
import { Thought } from "@prisma/client";
import { prismaMock as prisma } from '../singleton'
import ParsedThought from "@/app/lib/types/ParsedThought";
import { revalidatePath } from 'next/cache';


//import { jest} from '@jest/globals';

describe("Thought Input", () => {

  it("should render a text area and an open link", () => {

    const thought:Thought = {
      id:"1",
      thoughtString:"thought",
      thoughtTimeline:JSON.stringify("timeline"),
      createdAt:new Date(),
      updatedAt:new Date()
    }

    const parsedThought = {...thought, thoughtTimeline:[{ ms: 0, text: "tho" },{ ms: 2000, text: "thought" }]}

    render(<ThoughtReplay thought={parsedThought}/>);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
    expect(textarea.disabled).toBe(true);
    expect(textarea.value).toBe(thought.thoughtString);


  });

  

  
  it("should delete a thought when button is pressed", async () => {

    const thought:Thought = {
      id:"1",
      thoughtString:"thought",
      thoughtTimeline:JSON.stringify("timeline"),
      createdAt:new Date(),
      updatedAt:new Date()
    }

    const parsedThought = {...thought, thoughtTimeline:[{ ms: 0, text: "tho" },{ ms: 2000, text: "thought" }]}

    render(<ThoughtReplay thought={parsedThought}/>);

    const button = screen.getByTestId("deleteButton") as HTMLButtonElement;

    await userEvent.click(button);

    await new Promise(process.nextTick);
    
    expect(prisma.thought.delete.mock.calls.length).toBeGreaterThan(0);

  });

  it("should replay a thought when button is pressed", async () => {

    const thought:Thought = {
      id:"1",
      thoughtString:"thought thought thought",
      thoughtTimeline:JSON.stringify("timeline"),
      createdAt:new Date(),
      updatedAt:new Date()
    }

    const parsedThought = {...thought, thoughtTimeline:[{ ms: 0, text: "tho" },{ ms: 1000, text: "thought" }]}

    render(<ThoughtReplay thought={parsedThought}/>);

    const button = screen.getByTestId("replaybutton") as HTMLButtonElement;

    await userEvent.click(button);

    await timeout(100);
    
    let textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea.value).toBe('tho');

    await timeout(905);
   
    expect(textarea.value).toBe('thought');

    await timeout(100);
    
    expect(textarea.value).toBe('thought thought thought');


  });

});

function timeout(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}