import React from "react";
import { Grid, Card, Text } from "@geist-ui/core";
import { getNotes } from "../utils/notes";
import { Link } from "react-router-dom";

const NotesList = () => {
  // Get notes
  const notes = getNotes();

  return (
    <Grid.Container gap={2}>
      {notes.map((note) => (
        <Grid xs={24} sm={12} md={8} lg={6} xl={6} key={note.id}>
          <Link to={`/note/${note.id}`} style={{ width: "100%" }}>
            <Card hoverable style={{ cursor: "pointer" }} width="100%">
              <Text h3 font="1.2em">
                {note.title}
              </Text>
              <p>{note.date}</p>
            </Card>
          </Link>
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
