import React, { useMemo, useState } from "react";
import { Card } from "@geist-ui/core";
import { useParams } from "react-router-dom";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { getNote, getNotes, setNotes } from "../utils/notes";

const TextEditor = () => {
  const [editor] = useState(withReact(createEditor()));
  const { id } = useParams();

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
      <Card contentEditable={false}>
        <Editable style={{ width: "100%" }} />
      </Card>
    </Slate>
  );
};

export default TextEditor;
