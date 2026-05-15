"use client";
import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Code2,
  Quote,
  Minus,
  WrapText,
  Undo2,
  Redo2,
  RemoveFormatting,
  Trash2,
} from "lucide-react";
import { menuBarStateSelector } from "./menuBarState";

interface MenuBarProps {
  editor: Editor;
}

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton = ({
  onClick,
  disabled,
  isActive,
  title,
  children,
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    type="button"
    className={[
      "inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors",
      "text-muted-foreground hover:text-foreground hover:bg-accent",
      "disabled:hover:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
      isActive ? "bg-accent text-foreground" : "",
    ].join(" ")}
  >
    {children}
  </button>
);

const Separator = () => (
  <div className="bg-border mx-0.5 h-5 w-px flex-shrink-0" />
);

const EditorMenu = ({ editor }: MenuBarProps) => {
  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) return null;

  return (
    <div className="border-border bg-muted/30 flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5">
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!state.canBold}
        isActive={state.isBold}
        title="Bold (Ctrl+B)"
      >
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!state.canItalic}
        isActive={state.isItalic}
        title="Italic (Ctrl+I)"
      >
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!state.canStrike}
        isActive={state.isStrike}
        title="Strikethrough"
      >
        <Strikethrough size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!state.canCode}
        isActive={state.isCode}
        title="Inline code"
      >
        <Code size={14} />
      </ToolbarButton>

      <Separator />

      {/* Block types */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={state.isParagraph}
        title="Paragraph"
      >
        <Pilcrow size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={state.isHeading1}
        title="Heading 1"
      >
        <Heading1 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={state.isHeading2}
        title="Heading 2"
      >
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={state.isHeading3}
        title="Heading 3"
      >
        <Heading3 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={state.isHeading4}
        title="Heading 4"
      >
        <Heading4 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        isActive={state.isHeading5}
        title="Heading 5"
      >
        <Heading5 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        isActive={state.isHeading6}
        title="Heading 6"
      >
        <Heading6 size={14} />
      </ToolbarButton>

      <Separator />

      {/* Lists and blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={state.isBulletList}
        title="Bullet list"
      >
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={state.isOrderedList}
        title="Ordered list"
      >
        <ListOrdered size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={state.isCodeBlock}
        title="Code block"
      >
        <Code2 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={state.isBlockquote}
        title="Blockquote"
      >
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <Minus size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Hard break (Shift+Enter)"
      >
        <WrapText size={14} />
      </ToolbarButton>

      <Separator />

      {/* Clear actions */}
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title="Clear formatting"
      >
        <RemoveFormatting size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().clearNodes().run()}
        title="Clear nodes"
      >
        <Trash2 size={14} />
      </ToolbarButton>

      <Separator />

      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo2 size={14} />
      </ToolbarButton>
    </div>
  );
};

export default EditorMenu;
