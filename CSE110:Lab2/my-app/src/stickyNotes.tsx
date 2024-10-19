// src/stickyNotes.tsx
import './App.css';
import { useState, useEffect } from 'react';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from './themeContext';

const initialNote: Note = {
  id: -1,
  title: "",
  content: "",
  label: Label.other,
  isFavorite: false,
  isLiked: false,
  isDisliked: false,
};

export const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likedNotes, setLikedNotes] = useState<string[]>([]);
  const [dislikedNotes, setDislikedNotes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: notes.length + 1 };
    setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNoteHandler = (id: number, key: keyof Note, value: string) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, [key]: value };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const handleFavoriteToggle = (id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
  };

  const handleLikeToggle = (id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isLiked: !note.isLiked, isDisliked: false } : note
    );
    setNotes(updatedNotes);
  };

  const handleDislikeToggle = (id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isDisliked: !note.isDisliked, isLiked: false } : note
    );
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const favoriteNotes = notes.filter(note => note.isFavorite).map(note => note.title);
    const likedNoteTitles = notes.filter(note => note.isLiked).map(note => note.title);
    const dislikedNoteTitles = notes.filter(note => note.isDisliked).map(note => note.title);

    setFavorites(favoriteNotes);
    setLikedNotes(likedNoteTitles);
    setDislikedNotes(dislikedNoteTitles);
  }, [notes]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.foreground }}>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              style={{ backgroundColor: isTitleFocused ? 'lightblue' : 'white' }}
            />
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
              style={{
                width: '170px',
                backgroundColor: isContentFocused ? 'lightblue' : 'white',
              }}
              onFocus={() => setIsContentFocused(true)}
              onBlur={() => setIsContentFocused(false)}
            />
          </div>

          <div>
            <select
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit" className="submit-button">
              Create Note
            </button>
          </div>

          <div>
            <button onClick={toggleTheme}>
              {currentTheme === themes.light ? "Switch to Dark Theme" : "Switch to Light Theme"}
            </button>
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
              <div className="notes-header">
                <button onClick={() => deleteNoteHandler(note.id)}>x</button>
              </div>

              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(event) => updateNoteHandler(note.id, 'title', event.target.innerText)}
              >
                {note.title}
              </h2>

              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(event) => updateNoteHandler(note.id, 'content', event.target.innerText)}
              >
                {note.content}
              </p>

              <p>{note.label}</p>

              <div className="note-actions">
                <button onClick={() => handleFavoriteToggle(note.id)}>
                  {note.isFavorite ? '❤️' : '♡'}
                </button>
                <button onClick={() => handleLikeToggle(note.id)}>
                  {note.isLiked ? '👍' : '👍'}
                </button>
                <button onClick={() => handleDislikeToggle(note.id)}>
                  {note.isDisliked ? '👎' : '👎'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="note-lists">
          <div>
            <h3>List of favorites:</h3>
            <ul>
              {favorites.map(favTitle => (
                <li key={favTitle}>{favTitle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>List of liked notes:</h3>
            <ul>
              {likedNotes.map(likedTitle => (
                <li key={likedTitle}>{likedTitle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>List of disliked notes:</h3>
            <ul>
              {dislikedNotes.map(dislikedTitle => (
                <li key={dislikedTitle}>{dislikedTitle}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};