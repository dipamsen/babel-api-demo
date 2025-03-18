import { packages } from "@babel/standalone";

const {
  parser,
  traverse: { default: traverse },
} = packages;

export type Binding = InstanceType<(typeof packages)["traverse"]["Binding"]>;

export interface ScopeData {
  start?: number | null;
  end?: number | null;
  type: string;
  bindings: {
    [name: string]: Binding;
  };
  children: ScopeData[];
  parent: ScopeData | null;
}

export function getScopeTree(code: string): ScopeData | null {
  try {
    const ast = parser.parse(code, { errorRecovery: true, tokens: true });

    let currentScope: ScopeData | null = null;
    let scopeTree: ScopeData | null = null;

    traverse(ast, {
      Scope: {
        enter(path) {
          const scope: ScopeData = {
            start: path.node.start,
            end: path.node.end,
            type: path.node.type,
            bindings: path.scope.bindings,
            children: [],
            parent: null,
          };

          if (currentScope) {
            currentScope.children.push(scope);
            scope.parent = currentScope;
          }
          currentScope = scope;

          if (!scopeTree) {
            scopeTree = scope;
          }
        },
        exit() {
          currentScope = currentScope!.parent;
        },
      },
    });

    return scopeTree;
  } catch (e) {
    console.error(e);
    return null;
  }
}
