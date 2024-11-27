import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit2, 
  Trash2, 
  Plus,
  Save,
  X,
  AlertCircle,
  Camera
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Note {
  id: string;
  content: string;
  date: string;
  image?: string;
}

interface RecipeNotesProps {
  recipeId: number;
  initialNotes?: Note[];
}

export default function RecipeNotes({ recipeId, initialNotes = [] }: RecipeNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      date: new Date().toISOString(),
      image: newImage || undefined
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    setNewImage(null);
    toast.success('Note ajoutée');
  };

  const handleEditNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setEditingId(id);
      setEditContent(note.content);
    }
  };

  const handleSaveEdit = (id: string) => {
    if (!editContent.trim()) return;

    setNotes(prev => prev.map(note =>
      note.id === id
        ? { ...note, content: editContent }
        : note
    ));
    setEditingId(null);
    setEditContent('');
    toast.success('Note mise à jour');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast.success('Note supprimée');
  };

  return (
    <div className="space-y-6">
      {/* Add Note Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mes notes personnelles
        </h3>
        <div className="space-y-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Ajoutez une note personnelle..."
            className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            rows={3}
          />

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="note-image"
              />
              <label
                htmlFor="note-image"
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <Camera className="h-5 w-5 mr-2" />
                Ajouter une photo
              </label>
            </div>
            {newImage && (
              <img
                src={newImage}
                alt="Preview"
                className="h-12 w-12 rounded-lg object-cover"
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddNote}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter une note
          </motion.button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              {editingId === note.id ? (
                <div className="space-y-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleSaveEdit(note.id)}
                      className="p-2 text-green-500 hover:text-green-700"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  {note.image && (
                    <img
                      src={note.image}
                      alt="Note"
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditNote(note.id)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
            <p className="text-gray-600">
              Vous n'avez pas encore ajouté de notes pour cette recette.
              Les notes vous permettent de garder une trace de vos modifications et astuces personnelles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}