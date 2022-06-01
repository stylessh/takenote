import React, { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Card, Grid } from "@geist-ui/core";
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

// AI
import { getCompletion } from "../api/ai";

const TextEditor = () => {
  const [editor] = useState(withReact(createEditor()));
  const { id } = useParams();

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [currentLine, setCurrentLine] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionAdded, setCompletionAdded] = useState(true);

  const currentNote = useMemo(() => {
    return getNote(id);
  }, [id]);

  const handleNoteSave = (value) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    // Show completion if the user is writing a question
    const editorCurrentLine = value[editor.selection.focus.path[0]];
    setCurrentLine(editorCurrentLine);

    // Watch if writing a question with regex
    const isQuestion = editorCurrentLine.children[0].text.includes("?");
    const isMake =
      editorCurrentLine.children[0].text.includes("make") ||
      editorCurrentLine.children[0].text.includes("Make");

    if (isQuestion || isMake) {
      setShowCompletion(true);
    } else {
      setShowCompletion(false);
    }

    // Saving changes if writing
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

  const handleGetCompletion = async () => {
    setCompletionAdded(false);
    const input = currentLine.children[0].text;
    const response = await getCompletion(input);

    const outputText = response.choices[0].text;

    setCompletionAdded(true);

    // Insert output text in the editor
    editor.insertText(outputText);
  };

  return (
    <Slate
      editor={editor}
      value={currentNote.content}
      onChange={handleNoteSave}
    >
      <Toolbar>
        <MarkButton format="bold">
          <Bold size="1.5em" />
        </MarkButton>
        <MarkButton format="italic">
          <Italic size="1.5em" />
        </MarkButton>
        <MarkButton format="underline">
          <Underline size="1.5em" />
        </MarkButton>
        <MarkButton format="code">
          <Code size="1.5em" />
        </MarkButton>
        <BlockButton format="heading-one">
          <H1 />
        </BlockButton>
        <BlockButton format="heading-two">
          <H2 />
        </BlockButton>
        <BlockButton format="block-quote">
          <Quote />
        </BlockButton>
        <BlockButton format="numbered-list">
          <NumList />
        </BlockButton>

        <BlockButton format="bulleted-list">
          <List />
        </BlockButton>
      </Toolbar>

      <Card style={{ position: "relative" }} contentEditable={false}>
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

        {showCompletion && (
          <Button
            loading={!completionAdded}
            auto
            pl={0}
            pr={0}
            mt={-1}
            type="abort"
            onClick={handleGetCompletion}
          >
            Get completion
          </Button>
        )}
      </Card>
    </Slate>
  );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
  <Card width="100%">
    <div className="toolbar-content">{children}</div>
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
