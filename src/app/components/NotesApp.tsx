import { motion } from 'motion/react';
import { X, Send, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: Date;
}

interface NotesAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotesApp({ isOpen, onClose }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Welcome to Notes',
      content: 'Create notes and send them to the KAVION team!',
      timestamp: new Date()
    }
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [title, setTitle] = useState(notes[0].title);
  const [content, setContent] = useState(notes[0].content);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      timestamp: new Date()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const deleteNote = (id: number) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (selectedNote?.id === id) {
      setSelectedNote(filtered[0] || null);
      setTitle(filtered[0]?.title || '');
      setContent(filtered[0]?.content || '');
    }
  };

  const sendNote = () => {
    alert(`Note sent to KAVION team!\n\nTitle: ${title}\nContent: ${content}`);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 30,
        left: 10,
        right: window.innerWidth - 810,
        bottom: window.innerHeight - 610
      }}
      initial={{ scale: 0.9, opacity: 0, x: window.innerWidth / 2 - 400, y: 100 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed w-[800px] h-[600px] z-[60] rounded-[20px] backdrop-blur-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-white/30 shadow-2xl overflow-hidden cursor-move"
    >
      {/* Window Controls */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-white/10 bg-white/5 cursor-move">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
        </div>
        <span className="text-white/70 text-sm font-medium">Notes.app</span>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors cursor-pointer">
          <X size={18} />
        </button>
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar - Notes List */}
        <div className="w-64 border-r border-white/10 bg-white/5 p-3 overflow-y-auto">
          <button
            onClick={createNewNote}
            className="w-full mb-3 py-2 px-3 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            New Note
          </button>

          <div className="space-y-2">
            {notes.map(note => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleNoteClick(note)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedNote?.id === note.id
                    ? 'bg-yellow-500/20 border border-yellow-500/40'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{note.title}</h4>
                    <p className="text-white/50 text-xs truncate">{note.content}</p>
                    <p className="text-white/30 text-xs mt-1">
                      {note.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col p-6 cursor-auto">
          {selectedNote ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-2xl font-light text-white bg-transparent border-none outline-none mb-4 placeholder-white/30"
              />
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="flex-1 text-white/80 bg-transparent border-none outline-none resize-none placeholder-white/30 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  {content.length} characters
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendNote}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-500/50 transition-shadow cursor-pointer"
                >
                  <Send size={16} />
                  Send to KAVION
                </motion.button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/40">
              <p>Create a new note to get started</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
