import { Snapshot } from "./snapshot";

type ParsedThought = {
    id: string;
    createdAt: Date;
    thoughtString: string;
    thoughtTimeline: Snapshot[];
}

export default ParsedThought;