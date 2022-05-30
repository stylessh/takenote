import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../../utils/editor";
import { Checkbox } from "@geist-ui/core";

const BlockButton = ({ format, children }) => {
  const editor = useSlate();

  return (
    <div>
      <Checkbox
        value={format}
        checked={isBlockActive(editor, format)}
        onChange={(event) => {
          //   event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </Checkbox>
    </div>
  );
};

export default BlockButton;
