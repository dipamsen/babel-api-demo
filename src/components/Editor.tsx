import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { StateEffect } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

const sketch = `
let mover;

function setup() {
  createCanvas(400, 400);

  mover = new Mover();

  let x, y, z;
}

function draw() {
  background(220);
  ellipse(200, 200, 50, 50);

  mover.show();

  let a, b, c;

  if (a > b) {
    let veryLongVariableName = 10;
    let x = 20;
  }
}
`;

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
      doc: sketch,
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
