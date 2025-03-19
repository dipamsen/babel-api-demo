import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { StateEffect } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

export default function Editor({
  handleCodeChange,
  code,
}: {
  handleCodeChange: (code: string) => void;
  code: string;
}) {
  const e = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!e.current) return;
    const view = new EditorView({
      doc: code,
      parent: e.current!,
      extensions: [basicSetup, keymap.of([indentWithTab]), javascript()],
    });
    viewRef.current = view;

    const ul = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const newCode = update.state.doc.toString();
        handleCodeChange(newCode);
      }
    });

    view.dispatch({
      effects: StateEffect.appendConfig.of([ul]),
    });

    return () => {
      view.destroy();
    };
  }, [handleCodeChange]);

  useEffect(() => {
    if (viewRef.current) {
      const currentText = viewRef.current.state.doc.toString();
      if (currentText !== code) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentText.length, insert: code },
        });
      }
    }
  }, [code]);

  return <div className="editor" id="editor" ref={e}></div>;
}
