import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../../utils/editor";
import { Checkbox } from "@geist-ui/core";

const BlockButton = ({ format, children }) => {
  const editor = useSlate();

  return (
    <div>
      <Checkbox
        className="check"
        value={format}
        checked={isBlockActive(editor, format)}
        onChange={() => toggleBlock(editor, format)}
        style={{ lineHeight: 1 }}
      >
        {children}
      </Checkbox>
    </div>
  );
};

export default BlockButton;
