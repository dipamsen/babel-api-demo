import { useMemo } from "react";
import { Binding, getScopeTree, ScopeData } from "../utils/ScopeTree";

export default function Output({ code }: { code: string }) {
  const scopeTree = useMemo(() => getScopeTree(code), [code]);

  const renderScope = (scope: ScopeData | null) => {
    return scope ? (
      <div key={scope.start} className="scope">
        <code>{scope.type}</code>
        {Object.values(scope.bindings).map(renderBinding)}
        {scope.children.map(renderScope)}
      </div>
    ) : null;
  };

  const renderBinding = (binding: Binding) => {
    return (
      <div key={binding.identifier.name} className="binding">
        <code>{binding.identifier.name}</code>
      </div>
    );
  };

  return <div className="output">{renderScope(scopeTree)}</div>;
}
