"use client";

import "./editor.css";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Bold, Italic, Strikethrough, List, ListOrdered } from "lucide-react";
import EditorMenu from "./EditorMenu";

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

interface BubbleButtonProps {
  onClick: () => void;
  isActive: boolean;
  title: string;
  children: React.ReactNode;
}

const BubbleButton = ({
  onClick,
  isActive,
  title,
  children,
}: BubbleButtonProps) => (
  <button
    onClick={onClick}
    title={title}
    type="button"
    className={[
      "inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors",
      "text-muted-foreground hover:text-foreground hover:bg-accent",
      isActive ? "bg-accent text-foreground" : "",
    ].join(" ")}
  >
    {children}
  </button>
);

export function TextEditor({ value, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    content: `<p>${value}</p>`,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "bg-input/30 min-h-96 w-full px-3 py-2 text-sm leading-relaxed focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isStrikethrough: ctx.editor?.isActive("strike") ?? false,
    }),
  });

  // Always render the wrapper — editor may be null on SSR
  return (
    <div className="tiptap border-input focus-within:ring-ring w-full rounded-md border bg-transparent shadow-sm transition-colors focus-within:ring-1">
      {editor && (
        <>
          <EditorMenu editor={editor} />

          {/* Formatting bubble menu — shown on text selection */}
          <BubbleMenu
            editor={editor}
            options={{ placement: "top", offset: 8, flip: true }}
          >
            <div className="border-border bg-popover flex items-center gap-0.5 rounded-md border px-1 py-1 shadow-md">
              <BubbleButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editorState?.isBold ?? false}
                title="Bold"
              >
                <Bold size={13} />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editorState?.isItalic ?? false}
                title="Italic"
              >
                <Italic size={13} />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editorState?.isStrikethrough ?? false}
                title="Strikethrough"
              >
                <Strikethrough size={13} />
              </BubbleButton>
            </div>
          </BubbleMenu>

          {/* List-type toggle bubble menu — shown when cursor is inside a list */}
          <BubbleMenu
            editor={editor}
            shouldShow={() =>
              editor.isActive("bulletList") || editor.isActive("orderedList")
            }
            options={{ placement: "top-start", offset: 8 }}
          >
            <div className="border-border bg-popover flex items-center gap-0.5 rounded-md border px-1 py-1 shadow-md">
              <BubbleButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
                title="Bullet list"
              >
                <List size={13} />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
                title="Ordered list"
              >
                <ListOrdered size={13} />
              </BubbleButton>
            </div>
          </BubbleMenu>
        </>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
