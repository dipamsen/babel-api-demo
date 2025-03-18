# Scoping

To identify Babel nodes which create a new scope, the following type aliases are there for convenience:

```
BlockParent:
    | BlockStatement
    | CatchClause
    | DoWhileStatement
    | ForInStatement
    | ForStatement
    | FunctionDeclaration
    | FunctionExpression
    | Program
    | ObjectMethod
    | SwitchStatement
    | WhileStatement
    | ArrowFunctionExpression
    | ForOfStatement
    | ClassMethod
    | ClassPrivateMethod
    | StaticBlock
    | TSModuleBlock

FunctionParent:
    | FunctionDeclaration
    | FunctionExpression
    | ObjectMethod
    | ArrowFunctionExpression
    | ClassMethod
    | ClassPrivateMethod
    | StaticBlock
    | TSModuleBlock

Scopable:
    | BlockStatement
    | CatchClause
    | DoWhileStatement
    | ForInStatement
    | ForStatement
    | FunctionDeclaration
    | FunctionExpression
    | Program
    | ObjectMethod
    | SwitchStatement
    | WhileStatement
    | ArrowFunctionExpression
    | ClassExpression
    | ClassDeclaration
    | ForOfStatement
    | ClassMethod
    | ClassPrivateMethod
    | StaticBlock
    | TSModuleBlock
```

The `Scopable` alias has two additional node types compared to `BlockParent` and `FunctionParent`:

- `ClassExpression`
- `ClassDeclaration`

These are included because classes themselves create a new scope, (binding the class name to the class itself).

So, all nodes that create lexical scopes are (flow, typescript are excluded):

- `BlockStatement`
- `CatchClause`
- `DoWhileStatement`
- `ForInStatement`
- `ForStatement`
- `FunctionDeclaration`
- `FunctionExpression`
- `Program`
- `ObjectMethod`
- `SwitchStatement`
- `WhileStatement`
- `ArrowFunctionExpression`
- `ClassExpression`
- `ClassDeclaration`
- `ForOfStatement`
- `ClassMethod`
- `ClassPrivateMethod`
- `StaticBlock` -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks

There's also a virtual alias - `Scope`. It cleverly travels the AST and only includes nodes that create a new scope. This is useful for traversing the AST and finding the scope of a node.
