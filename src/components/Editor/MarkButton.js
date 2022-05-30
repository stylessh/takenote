import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../../utils/editor";
import { Checkbox } from "@geist-ui/core";

const MarkButton = ({ format, children }) => {
  const editor = useSlate();

  return (
    <div>
      <Checkbox
        checked={isMarkActive(editor, format)}
        onChange={() => toggleMark(editor, format)}
        style={{ lineHeight: 1 }}
      >
        {children}
      </Checkbox>
    </div>
  );
};

export default MarkButton;
