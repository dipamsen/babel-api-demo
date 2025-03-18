# NodePath

This class represents a node in the AST along with its surrounding context and is used to traverse and manipulate the tree. It is created by the `@babel/traverse` module and is passed to the visitor functions.

## Properties

### container

### context

### contexts

### data

### hub

### inList

### key

### listKey

### node

### opts

### parent

### parentKey

### parentPath

### removed

### scope

### shouldSkip

### shouldStop

### skipKeys

### state

### type

### typeAnnotation

## Methods

### addComment(type: CommentTypeShorthand, content: string, line: boolean)

### addComments(type: CommentTypeShorthand, comments: Comment[])

Give node `comments` of the specified `type`.

### arrowFunctionToExpression({ allowInsertArrow?: boolean, allowInsertArrowWithRest?: boolean, noNewArrows?: boolean, specCompliant?: boolean })

Convert a given arrow function into a normal ES5 function expression.

### assertX(opts: Object)

Assert that the current node is of a certain type.

### isX(opts: Object)

Check if the current node is of a certain type.

### baseTypeStrictlyMatches(rightArg: NodePath)

### buildCodeFrameError(msg: string, Error?: ErrorConstructor)

### call(key: string)

### canHaveVariableDeclarationOrExpression()

This checks whether or not we're in one of the following positions:

```js
for (KEY in right);
for (KEY; ; );
```

This is because these spots allow VariableDeclarations AND normal expressions so we need to tell the path replacement that it's ok to replace this with an expression.

### canSwapBetweenExpressionAndStatement(replacement: Node)

This checks whether we are swapping an arrow function's body between an expression and a block statement (or vice versa).

This is because arrow functions may implicitly return an expression, which is the same as containing a block statement.

### couldBeBaseType(name: string)

### debug(buildMessage: () => string)

### ensureBlock()

### equals(key: string, value: any)

Check whether the path node `key` strict equals `value`.

### evaluate()

Walk the input `node` and statically evaluate it.

Returns an object in the form `{ confident, value, deopt }`. `confident` indicates whether or not we had to drop out of evaluating the expression because of hitting an unknown node that we couldn't confidently find the value of, in which case `deopt` is the path of said node.

Example:

```js
t.evaluate(parse("5 + 5")); // { confident: true, value: 10 }
t.evaluate(parse("!true")); // { confident: true, value: false }
t.evaluate(parse("foo + foo")); // { confident: false, value: undefined, deopt: NodePath }
```

### evaluateTruthy()

Walk the input `node` and statically evaluate if it's truthy.

Returning `true` when we're sure that the expression will evaluate to a truthy value, `false` if we're sure that it will evaluate to a falsy value and `undefined` if we aren't sure. Because of this please do not rely on coercion when using this method and check with === if it's `false`.

### find(callback: (path: NodePath) => boolean)

Starting at current `NodePath` and going up the tree, return the first `NodePath` that causes the provided `callback` to return a truthy value, or `null` if the `callback` never returns a truthy value.

### findParent

Starting at the parent path of the current `NodePath` and going up the tree, return the first `NodePath` that causes the provided `callback` to return a truthy value, or `null` if the callback never returns a truthy value.

### get(key: string|number|Symbol, context?: boolean | TraversalContext)

### getAllNextSiblings()

### getAllPrevSiblings()

### getAncestry()

Build an array of node paths containing the entire ancestry of the current node path.

NOTE: The current node path is included in this.

### getBindingIdentifierPaths(duplicates: boolean, outerOnly: boolean)

### getBindingIdentifiers(duplicates: boolean)

### getCompletionRecords(): NodePath[]

### getData(key: string | symbol, def?: any): any

### getDeepestCommonAncestorFrom(paths: NodePath[], filter?: (deepest: Node, i: number, ancestries: NodePath[]) => NodePath): NodePath

Get the earliest path in the tree where the provided `paths` intersect.

### getEarliestCommonAncestorFrom(paths: NodePath[]): NodePath

Get the deepest common ancestor and then from it, get the earliest relationship path to that ancestor.

Earliest is defined as being "before" all the other nodes in terms of list container position and visiting key.

### getFunctionParent()

Get the parent function of the current path.

### getNextSibling(): NodePath

### getOpposite(): NodePath

### getOuterBindingIdentifierPaths(duplicates: boolean)

### getOuterBindingIdentifiers(duplicates: boolean)

### getPathLocation(): string

### getPrevSibling(): NodePath

### getScope(scope?: Scope): Scope

### getSibling(key: string): NodePath

### getSource(): string

### getStatementParent(): NodePath<Statement>

Walk up the tree until we hit a parent node path in a list.

### getTypeAnnotation(): FlowType | TSType

Infer the type of the current `NodePath`.

### has(key: string) / is(key: string)

Check whether we have the input `key`. If the `key` references an array then we check if the array has any items, otherwise we just check if it's falsy.

### hasNode()

### hoist(scope: Scope)

Hoist the current node to the highest scope possible and return a UID referencing it.

### insertAfter(nodes: NodesInsertionParam<Node>)

Insert the provided nodes after the current one. When inserting nodes after an expression, ensure that the completion record is correct by pushing the current node.

### insertBefore(nodes: NodesInsertionParam<Node>)

Insert the provided nodes before the current one.

### inType(...candidateTypes: string[]): boolean

### matchesPattern(pattern: string, allowPartial?: boolean): boolean

Match the current node if it matches the provided pattern.

For example, given the pattern `React.createClass` it would match the parsed nodes of `React.createClass` and `React["createClass"]`.

### popContext()

### pushContainer(listKey: string, nodes): NodePaths

Insert child nodes at the end of the current node.

- `listKey`: The key at which the child nodes are stored (usually body).
- `nodes`: The nodes to insert.

### pushContext(context: TraversalContext)

### referencesImport(moduleSource: string, importName: string)

Check if the currently assigned path references the importName of moduleSource.

### remove()

### replaceExpressionWithStatements(nodes: Statement[])

This method takes an array of statements nodes and then explodes it into expressions. This method retains completion records which is extremely important to retain original semantics.

### replaceInline(nodes: Node[])

### replaceWith(replacementPath: NodePath | Node): \[NodePath]

### replaceWithMultiple(nodes: Node[]): NodePaths<Node>

Replace a node with an array of multiple. This method performs the following steps:

- Inherit the comments of first provided node with that of the current node.
- Insert the provided nodes after the current node.
- Remove the current node.

### replaceWithSourceString(replacement: string): \[NodePath]

Parse a string as an expression and replace the current node with the result.

NOTE: This is typically not a good idea to use. Building source strings when transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's easier to use, your transforms will be extremely brittle.

### requeue(pathToQueue: NodePath)

### resolve(dangerous?: boolean, resolved?: NodePath[]): NodePath

### resync()

Here we resync the node paths `key` and `container`. If they've changed according to what we have stored internally then we attempt to resync by crawling and looking for the new values.

### set(key: string, node: any)

### setContext(context: TraversalContext)

### setData(key: string | symbol, val: any): any

### setScope()

### shareCommentsWithSiblings()

Share comments amongst siblings.

### skip()

### skipKey(key: string)

### stop()

### toComputedKey(): Expression | PrivateName

### traverse(visitor: TraversalOptions, state?: any)

### unshiftContainer(listKey: string, nodes: Node[])

Insert child nodes at the start of the current node.

- `listKey`: The key at which the child nodes are stored (usually body).
- `nodes`: The nodes to insert.

### unwrapFunctionEnvironment()

Given an arbitrary function, process its content as if it were an arrow function, moving references to "this", "arguments", "super", and such into the function's parent scope. This method is useful if you have wrapped some set of items in an IIFE or other function, but want "this", "arguments", and super" to continue behaving as expected.

### updateSiblingKeys(fromIndex: number, incrementBy: number)

Update all sibling node paths after `fromIndex` by `incrementBy`.

### visit(): boolean

### willIMaybeExecuteBefore(target: NodePath): boolean

Check if the current path will maybe execute before another path
