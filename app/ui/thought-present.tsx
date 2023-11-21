import { sono } from "./fonts";
import { FaBookOpen } from "react-icons/fa6";
import moment from "moment";
import prisma from "../lib/db";
import Link from "next/link";
import TextArea from "./text-area";
import { Thought } from "@prisma/client";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;

// TODO: Refact it to:
// export default async function ThoughtPresent(props: IThoughtPresentProps)...
// Create a new interface: IThoughtPresentProps:
// export interface IThoughtPresentProps { id: string }

export default function ThoughtPresent({ thought }: { thought: Thought }) {
  // TODO: Consider to use type safety for prisma:
  // https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety
  // we should avoid "any" as a type！
  // const thought = await prisma.thought.findUnique({
  //   where: {
  //     id: id,
  //   },
  // });

  // TODO: Remove any "anytype" from the code
  return (
    <div className="m-4 relative snap-center shrink-0">
      <p data-testid="date" className="py-2 text-slate-400">
        {moment(thought?.createdAt).format("ddd MMM D YYYY hh:mm A")}
      </p>
      <TextArea
        thought={thought?.thoughtString ?? ""}
        isDisabled={true}
      ></TextArea>
      <Link
        href={`/history/${thought.id}/visit`}
        className="absolute bottom-2 right-2 px-4 py-2 flex items-center gap-1 p-2 bg-stream-500 hover:bg-stream-600 rounded-2xl text-white font-medium"
      >
        <FaBookOpen />
        <p>Open</p>
      </Link>
    </div>
  );
}
