"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

interface TextEditorProps {
  defaultText: string;
}

export function TextEditor({ defaultText }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>${defaultText}</p>`,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "bg-input/30 min-h-96 w-full px-3 py-2 text-sm leading-relaxed focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  const { isBold, isItalic, isStrikethrough } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrikethrough: ctx.editor.isActive("strike"),
    }),
  });

  return (
    <div className="border-input focus-within:ring-ring w-full rounded-md border bg-transparent shadow-sm transition-colors focus-within:ring-1">
      {editor && (
        <>
          <BubbleMenu
            editor={editor}
            options={{ placement: "bottom", offset: 8, flip: true }}
          >
            <div className="bubble-menu">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={isBold ? "is-active" : ""}
                type="button"
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={isItalic ? "is-active" : ""}
                type="button"
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={isStrikethrough ? "is-active" : ""}
                type="button"
              >
                Strike
              </button>
            </div>
          </BubbleMenu>

          <BubbleMenu
            editor={editor}
            shouldShow={() =>
              editor.isActive("bulletList") || editor.isActive("orderedList")
            }
            getReferencedVirtualElement={() => {
              const parentNode = findParentNode(
                (node) =>
                  node.type.name === "bulletList" ||
                  node.type.name === "orderedList",
              )(editor.state.selection);
              if (parentNode) {
                const domRect = posToDOMRect(
                  editor.view,
                  parentNode.start,
                  parentNode.start + parentNode.node.nodeSize,
                );
                return {
                  getBoundingClientRect: () => domRect,
                  getClientRects: () => [domRect],
                };
              }
              return null;
            }}
            options={{ placement: "top-start", offset: 8 }}
          >
            <div className="bubble-menu">
              <button
                onClick={() => {
                  const chain = editor.chain().focus();
                  if (editor.isActive("bulletList")) {
                    chain.toggleOrderedList();
                  } else {
                    chain.toggleBulletList();
                  }
                  chain.run();
                }}
                type="button"
              >
                Toggle list type
              </button>
            </div>
          </BubbleMenu>
        </>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
