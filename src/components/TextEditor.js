import React, { useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Card, Grid } from "@geist-ui/core";
import { Bold, Italic, Underline, List, Code } from "@geist-ui/icons";

// hotkeys
import isHotkey from "is-hotkey";
import { HOTKEYS } from "../constants";

import { getNote, getNotes, setNotes } from "../utils/notes";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Editor toolbar
import Element from "./Editor/Element";
import Leaf from "./Editor/Leaf";
import { toggleMark } from "../utils/editor";
import MarkButton from "./Editor/MarkButton";
import BlockButton from "./Editor/BlockButton";
import H1 from "./Icons/H1";
import H2 from "./Icons/H2";
import Quote from "./Icons/Quote";
import NumList from "./Icons/NumList";

const TextEditor = () => {
  const [editor] = useState(withReact(createEditor()));
  const { id } = useParams();

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const currentNote = useMemo(() => {
    return getNote(id);
  }, [id]);

  const handleNoteSave = (value) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    if (isAstChange) {
      // Get notes from local storage
      const notes = getNotes();
      const currentNote = notes.find((note) => note.id === id);
      currentNote.content = value;

      // Update date
      currentNote.date = new Date().toLocaleString();

      // Set notes to local storage
      setNotes(notes);
    }
  };

  return (
    <Slate
      editor={editor}
      value={currentNote.content}
      onChange={handleNoteSave}
    >
      <Toolbar>
        <Grid lg={1}>
          <MarkButton format="bold">
            <Bold />
          </MarkButton>
        </Grid>
        <Grid lg={1}>
          <MarkButton format="italic">
            <Italic />
          </MarkButton>
        </Grid>
        <Grid lg={1}>
          <MarkButton format="underline">
            <Underline />
          </MarkButton>
        </Grid>
        <Grid lg={1}>
          <MarkButton format="code">
            <Code />
          </MarkButton>
        </Grid>
        <Grid lg={1}>
          <BlockButton format="heading-one">
            <H1 />
          </BlockButton>
        </Grid>
        <Grid lg={1}>
          <BlockButton format="heading-two">
            <H2 />
          </BlockButton>
        </Grid>
        <Grid lg={1}>
          <BlockButton format="block-quote">
            <Quote />
          </BlockButton>
        </Grid>
        <Grid lg={1}>
          <BlockButton format="numbered-list">
            <NumList />
          </BlockButton>
        </Grid>

        <Grid lg={1}>
          <BlockButton format="bulleted-list">
            <List />
          </BlockButton>
        </Grid>
      </Toolbar>

      <Card contentEditable={false}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{ width: "100%" }}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Card>
    </Slate>
  );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
  <Card marginBottom={1}>
    <Grid.Container>{children}</Grid.Container>
  </Card>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} />
));

export default TextEditor;
