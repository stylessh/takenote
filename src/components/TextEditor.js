import React, { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Card, Grid } from "@geist-ui/core";
import {
  Bold,
  Italic,
  Underline,
  List,
  Code,
  ArrowLeft,
} from "@geist-ui/icons";

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
        <Grid xs sm md={1} lg={1} xl={1}>
          <MarkButton format="bold">
            <Bold size="1.5em" />
          </MarkButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <MarkButton format="italic">
            <Italic size="1.5em" />
          </MarkButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <MarkButton format="underline">
            <Underline size="1.5em" />
          </MarkButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <MarkButton format="code">
            <Code size="1.5em" />
          </MarkButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <BlockButton format="heading-one">
            <H1 />
          </BlockButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <BlockButton format="heading-two">
            <H2 />
          </BlockButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <BlockButton format="block-quote">
            <Quote />
          </BlockButton>
        </Grid>
        <Grid xs sm md={1} lg={1} xl={1}>
          <BlockButton format="numbered-list">
            <NumList />
          </BlockButton>
        </Grid>

        <Grid xs sm md={1} lg={1} xl={1}>
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
  <Card width="100%">
    <Grid.Container alignItems="center" justify="flex-start" gap={6}>
      {children}
    </Grid.Container>
  </Card>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();

  return (
    <Grid.Container gap={2} marginBottom={1}>
      <Grid xs sm md={22} lg={22} xl={22}>
        <Menu {...props} ref={ref} />
      </Grid>

      {/* Go back button */}
      <Grid xs={24} sm={24} md={2} lg={2} xl={2}>
        <Card
          hoverable
          width="100%"
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft />
        </Card>
      </Grid>
    </Grid.Container>
  );
});

export default TextEditor;
