// src/stickyNotes.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("StickyNotes Component", () => {
  
  // Test: Renders the form
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  // Test: Creates a new note
  test("creates a new note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  // Test: Reads all created notes
  test("reads all created notes", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    // Create two notes
    fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 2" } });
    fireEvent.click(createNoteButton);

    // Assert both notes are displayed
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
  });

  // Test: Updates an existing note
  test("updates an existing note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Old Title" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Old Content" } });
    fireEvent.click(createNoteButton);

    const titleElement = screen.getByText("Old Title");
    fireEvent.blur(titleElement, { target: { innerText: "Updated Title" } });

    expect(screen.getByText("Updated Title")).toBeInTheDocument();
  });

  // Test: Deletes a note
  test("deletes a note", () => {
    render(<StickyNotes />);
  
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
  
    fireEvent.change(createNoteTitleInput, { target: { value: "Note to Delete" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content to Delete" } });
    fireEvent.click(createNoteButton);
  
    // Find all delete buttons
    const deleteButtons = screen.getAllByText("x");
  
    // Delete the first note (adjust index if necessary)
    fireEvent.click(deleteButtons[0]);
  
    // Assert the note is no longer in the document
    expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
  });
});