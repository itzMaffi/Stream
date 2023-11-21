import { ChangeEvent, KeyboardEvent } from "react";
import { sono } from "./fonts";

const COLS = 30;
const ROWS = 15;
const MAX_LENGTH = COLS * ROWS;
type incProp = {
  thought: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
};
export default function TextArea({
  thought,
  handleKeyDown,
  handleChange,
  isDisabled = false,
}: incProp) {
  return (
    <textarea
      data-testid="textarea"
      className={`rounded-md p-8 shadow-lg focus:outline-none resize-none overflow-hidden ${sono.className} md:text-xl break-all whitespace-break-spaces`}
      cols={COLS}
      rows={ROWS}
      maxLength={MAX_LENGTH}
      name="thought"
      value={thought}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      autoFocus={true}
      disabled={isDisabled}
    />
  );
}
