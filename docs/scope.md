# Scope

In `@babel/traverse`, the `Scope` class represents a lexical scope. It is present in `NodePath` instances and is used to track bindings and references in the code.

## Properties

### bindings

A map of all the bindings in the current scope. The keys are the names of the bindings and the values are `Binding` objects.

### block

### crawling

### data

### globals

A map of all the undeclared global identifiers in the current scope. The keys are the names of the identifiers and the values are `Identifier` nodes.

Note that this only includes identifiers that are not declared in the program. Also, all global identifiers are stored in the top-level scope only.

For example, in the following code:

```js
const a = 1;
function foo() {
  const b = 2;
  console.log(a, b);
  d;
}
c;
```

The `globals` map in the top-level scope will contain the following entries (unless modified):

```js
{
  console: Identifier,
  d: Identifier,
  c: Identifier
}
```

This follows the idea that when an identifier is not found in the current scope, it is searched for in the parent scope. If the current scope is the top-level scope, the identifier is considered a global identifier.

### hub

### labels

### parent

### parentBlock

### path

### references

### uid

### uids

## Methods

### addGlobal(node: Identifier)

Adds a global identifier to the scope. Modifies the `globals` map.

### bindingIdentifierEquals

### buildUndefinedNode

### checkBlockScopedCollisions

### crawl

### dump

### generateDeclaredUidIdentifier

### generateUid

### generateUidIdentifier

### generateUidIdentifierBasedOnNode

### getAllBindings()

Walks up the scope tree and collects all the bindings in the current scope and its ancestors.

### getAllBindingsOfKind(...kinds: string[])

Walks up the scope tree and collects all the bindings of the given kind.

### getBinding(name: string)

Walks up the scope tree and returns the binding with the given name.

### getBindingIdentifier(name: string)

Walks up the scope tree and returns the identifier of the binding with the given name.

### getOwnBinding(name: string)

Get the binding with the given name in the current scope only.

### getOwnBindingIdentifier(name: string)

Get the identifier of the binding with the given name in the current scope.

### hasBinding(name: string, optsOrNoGlobals?: boolean | { noGlobals?: boolean, noUids?: boolean })

True if the scope or any of its ancestors has a binding with the given name.

### hasOwnBinding(name: string)

True if the current scope itself has a binding with the given name.

### removeBinding(name: string)

Walks up the scope tree and removes the binding with the given name.

### removeOwnBinding(name: string)

Removes the binding with the given name in the current scope.

### getBlockParent

Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the very top and hit Program. (Returns Scope)

### getFunctionParent

Walk up the scope tree until we hit either a Function or return null. (Returns Scope)

### getPatternParent

Walk up from a pattern scope (function param initializer) until we hit a non-pattern scope, then returns its block parent

### getLabel(name: string)

### getProgramParent

Walk up the scope tree until we hit a Program. (Returns Scope)

### hasGlobal(name: string)

True if the scope or any of its ancestors has a global identifier with the given name.

### hasLabel(name: string)

### hasReference(name: string)

### hasUid

### isPure(node: Node, constantsOnly?: boolean)

### isStatic(node: Node)

Determine whether evaluating the specific input node is a consequenceless reference. ie. evaluating it wont result in potentially arbitrary code from being ran. The following are whitelisted and determined not to cause side effects:

- this expressions
- super expressions
- Bound identifiers

### maybeGenerateMemoised

### moveBindingTo

### parentHasBinding

### push

### registerBinding

### registerConstantViolation

### registerDeclaration

### registerLabel

### getData

Recursively walk up scope tree looking for the data `key`.

### setData(key: string, val: any)

Set some arbitrary data on the current scope.

### removeData

Recursively walk up scope tree looking for the data `key` and if it exists, remove it.

### rename(oldName: string, newName?: string, block?: Node)

Rename a binding in the current scope.

### toArray

### traverse
