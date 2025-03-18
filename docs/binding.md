# Binding

This class is responsible for a binding inside of a scope.

It tracks the following:

- Node path.
- Amount of times referenced by other nodes.
- Paths to nodes that reassign or modify this binding.
- The kind of binding. (Is it a parameter, declaration etc)

## Properties

### constant

True if the binding is not reassigned anywhere in the scope.

### constantViolations

An array of paths to nodes that reassign or modify this binding.

### hasDeoptedValue

### hasValue

### identifier

Identifier node that represents the binding.

### kind

### path

### referenced

Whether the binding is referenced by other nodes.

### referencePaths

An array of paths to nodes that reference this binding.

### references

The amount of times the binding is referenced by other nodes.

### scope

`Scope` object that the binding belongs to.

### value

## Methods

### clearValue()

### deopValue()

### dereference()

Decrements the amount of references to the binding.

### reassign(path: NodePath)

Register a constant violation with the given path.

### reference(path: NodePath)

Increments the amount of references to the binding.

### setValue(value)
