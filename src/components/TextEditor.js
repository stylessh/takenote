import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@geist-ui/core";
import { useParams } from "react-router-dom";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Define initial value.
const initialValue = [];

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { id } = useParams();

  const currentNote = useMemo(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    return notes.find((note) => note.id === id);
  }, [id]);

  const handleNoteSave = (value) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    if (isAstChange) {
      // Get notes from local storage
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const currentNote = notes.find((note) => note.id === id);
      currentNote.content = value;

      // Set notes to local storage
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  };

  return (
    <Slate
      editor={editor}
      value={currentNote.content || initialValue}
      onChange={handleNoteSave}
    >
      <Card>
        <Editable
          style={{ width: "100%" }}
          spellCheck
          placeholder="Enter some rich text…"
        />
      </Card>
    </Slate>
  );
};

export default TextEditor;
