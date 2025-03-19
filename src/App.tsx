import { useState } from "react";
import Editor from "./components/Editor";
import Output from "./components/Output";

const sketch = `
let x = 2;

function outer() {
  let y = 2;
  function inner(n) {
    let z = 2 * n;
    for (let i = 0; i < 10; i++) {
      var count = z;
      z = z * 2;
    }
    return y + z;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }
  greet(greeting) {
    return \`\${greeting}, \${this.name}\`
  }
}
`.trim();

function App() {
  const [code, setCode] = useState(sketch);

  return (
    <>
      <div className="header">
        <h1>Babel API Demo</h1>
        <div className="info">
          The right panel shows a 'scope tree' - each box represents a lexical
          scope in the code. Tokens written in blue are bindings (variables,
          functions, classes, etc.) declared in that scope. Bindings of a scope
          are accessible in that scope and its children.
        </div>
      </div>
      <div className="split">
        <Editor handleCodeChange={setCode} code={code} />
        <Output code={code} />
      </div>
    </>
  );
}

export default App;
