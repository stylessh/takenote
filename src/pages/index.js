import React from "react";

import { Card, Grid, Page, Text } from "@geist-ui/core";
import { Plus } from "@geist-ui/icons";

import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    // Get notes from local storage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Set new note to local storage array
    const newNote = {
      title: "New Note",
      content: [],
      id: `note-${notes.length}`,
    };

    notes.push(newNote);

    // Set notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Navigate to new note
    navigate(`/note/${newNote.id}`);
  };

  return (
    <>
      <Grid.Container>
        <Grid xs={24} sm={24} md={24} lg={10} xl={10}>
          <Card
            hoverable
            style={{ cursor: "pointer", width: "100%" }}
            onClick={handleCreateNote}
          >
            <Card.Content
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <Plus />

              <Text h6 style={{ margin: ".5em" }}>
                Start a new note
              </Text>
            </Card.Content>
          </Card>
        </Grid>
      </Grid.Container>

      <Text style={{ fontWeight: "bold" }} font="2em">
        Recent notes
      </Text>

      {/* Grid list with empty blocks */}

      <Grid.Container gap={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
          <Grid xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card hoverable style={{ cursor: "pointer" }} width="100%">
              <p>Test card</p>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
};

export default Index;
