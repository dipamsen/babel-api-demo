import { useState } from "react";
import Editor from "./components/Editor";
import Output from "./components/Output";

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

function App() {
  const [code, setCode] = useState(sketch);

  return (
    <div className="split">
      <Editor handleCodeChange={setCode} code={code} />
      <Output code={code} />
    </div>
  );
}

export default App;
