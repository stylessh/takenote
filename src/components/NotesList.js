import React, { useState } from "react";
import { Grid, Card, Text, Button } from "@geist-ui/core";
import { Trash } from "@geist-ui/icons";

import { useNavigate } from "react-router-dom";

import { deleteNote, getNotes } from "../utils/notes";

const NotesList = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(() => getNotes());

  const handleDeleteNote = (e, id) => {
    e.stopPropagation();
    deleteNote(id);

    const newNotes = getNotes();
    setNotes(newNotes);
  };

  return (
    <Grid.Container gap={2}>
      {notes.map((note) => (
        <Grid xs={24} sm={12} md={8} lg={6} xl={6} key={note.id}>
          <Card
            hoverable
            style={{ cursor: "pointer", position: "relative" }}
            width="100%"
            className="notes-list-item"
            onClick={() => navigate("/note/" + note.id)}
          >
            <Text h3 font="1.2em">
              {note.title}
            </Text>
            <p>{note.date}</p>

            {/* Delete button */}

            <Button
              auto
              scale={0.5}
              type="error"
              ghost
              icon={<Trash />}
              className="delete-button"
              style={{
                position: "absolute",
                top: "2em",
                right: "1.5em",
                zIndex: 10,
              }}
              onClick={(e) => handleDeleteNote(e, note.id)}
            />
          </Card>
        </Grid>
      ))}
      {/* Fallback */}

      {notes.length === 0 && (
        <Grid xs={24} sm={12} md={8} lg={6} xl={6}>
          <p>You don't have any notes yet.</p>
        </Grid>
      )}
    </Grid.Container>
  );
};

export default NotesList;
