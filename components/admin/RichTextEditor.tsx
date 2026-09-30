"use client";
import { useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Underline, Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaPicker } from "./MediaPicker";

// Éditeur des articles : le HTML est placé dans un input caché `name`
// (nettoyé côté serveur par sanitizeArticleHtml avant enregistrement).
export function RichTextEditor({ name, initialHtml }: { name: string; initialHtml: string }) {
  const [html, setHtml] = useState(initialHtml);
  const [pickerOpen, setPickerOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image,
    ],
    content: initialHtml,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none min-h-[360px] px-5 py-4 focus:outline-none",
        "aria-label": "Contenu de l'article",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white focus-within:border-neutral-950">
      <input type="hidden" name={name} value={html} />
      {editor && <Toolbar editor={editor} onImage={() => setPickerOpen(true)} />}
      <EditorContent editor={editor} />
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={([m]) => editor?.chain().focus().setImage({ src: m.url, alt: m.alt ?? "" }).run()}
      />
    </div>
  );
}

// Empêche le bouton de prendre le focus : le curseur reste dans le texte
const keepFocus = (e: React.MouseEvent) => e.preventDefault();

function Toolbar({ editor, onImage }: { editor: Editor; onImage: () => void }) {
  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Adresse du lien (laisser vide pour retirer)", previous ?? "https://");
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const buttons = [
    { label: "Titre 2", icon: Heading2, active: editor.isActive("heading", { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "Titre 3", icon: Heading3, active: editor.isActive("heading", { level: 3 }), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Gras", icon: Bold, active: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { label: "Italique", icon: Italic, active: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { label: "Souligné", icon: Underline, active: editor.isActive("underline"), run: () => editor.chain().focus().toggleUnderline().run() },
    { label: "Liste à puces", icon: List, active: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "Liste numérotée", icon: ListOrdered, active: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "Citation", icon: Quote, active: editor.isActive("blockquote"), run: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "Lien", icon: Link2, active: editor.isActive("link"), run: setLink },
    { label: "Image", icon: ImagePlus, active: false, run: onImage },
  ];

  return (
    <div className="flex flex-wrap gap-1 border-b border-neutral-100 bg-neutral-50 p-1.5">
      {buttons.map(({ label, icon: Icon, active, run }) => (
        <button
          key={label}
          type="button"
          onMouseDown={keepFocus}
          onClick={run}
          title={label}
          aria-label={label}
          aria-pressed={active}
          className={cn(
            "cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900",
            active && "bg-white text-neutral-950 shadow-sm",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
      <span className="mx-1 w-px bg-neutral-200" />
      <button type="button" onMouseDown={keepFocus} title="Annuler" aria-label="Annuler" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-white disabled:opacity-40">
        <Undo2 className="h-4 w-4" />
      </button>
      <button type="button" onMouseDown={keepFocus} title="Rétablir" aria-label="Rétablir" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-white disabled:opacity-40">
        <Redo2 className="h-4 w-4" />
      </button>
    </div>
  );
}
