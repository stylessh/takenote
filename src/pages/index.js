import React, { useState } from "react";

import { Card, Grid, Input, Modal, Text, useModal } from "@geist-ui/core";
import { Plus } from "@geist-ui/icons";

import { useNavigate } from "react-router-dom";
import NotesList from "../components/NotesList";

import { getNotes, setNotes } from "../utils/notes";
import Footer from "../components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { setVisible, bindings } = useModal();
  const [noteTitle, setNoteTitle] = useState("");

  const handleCreateNote = () => {
    // Get notes from local storage
    const notes = getNotes();

    // Set new note to local storage array
    const newNote = {
      title: noteTitle || "Untitled Note",
      // Default content
      content: [
        {
          type: "paragraph",
          children: [{ text: "Start writing here." }],
        },
      ],
      id: `note-${notes.length}`,
      date: new Date().toLocaleString(),
    };

    notes.push(newNote);

    // Set notes to local storage
    setNotes(notes);

    // Close modal
    setVisible(false);

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
            onClick={() => setVisible(true)}
          >
            <Card.Content
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <Plus />

              <Text h6 style={{ margin: ".5em" }}>
                Create a new note
              </Text>
            </Card.Content>
          </Card>
        </Grid>

        {/* Modal */}
        <Modal {...bindings}>
          {/*header*/}

          <Modal.Title>Create new note</Modal.Title>

          <Modal.Content>
            <Input
              width="100%"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              htmlType="text"
              placeholder="Note's name..."
              onKeyDown={(e) => {
                e.key === "Enter" && handleCreateNote();
                e.key === "Escape" && setVisible(false);
              }}
              autoFocus
            />
          </Modal.Content>

          {/*footer*/}
          <Modal.Action passive onClick={() => setVisible(false)}>
            Cancel
          </Modal.Action>
          <Modal.Action onClick={handleCreateNote}>Create</Modal.Action>
        </Modal>
      </Grid.Container>

      <Text style={{ fontWeight: "bold" }} font="2em">
        Recent notes
      </Text>

      {/* Grid list with empty blocks */}

      <NotesList />

      <Footer />
    </>
  );
};

export default Index;
