// Get notes from local storage
export const getNotes = () => {
  return JSON.parse(localStorage.getItem("notes"))?.reverse() || [];
};

// Get single note from local storage
export const getNote = (id) => {
  const notes = getNotes();
  return notes.find((note) => note.id === id);
};

// Delete note from local storage
export const deleteNote = (id) => {
  const notes = getNotes();
  const newNotes = notes.filter((note) => note.id !== id);

  setNotes(newNotes);
};

// Set notes to local storage
export const setNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
