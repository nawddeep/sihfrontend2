import React from "react";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-12">
      {Icon && (
        <Icon className="w-16 h-16 text-dark-700 mx-auto mb-4" />
      )}
      <h3 className="text-lg font-semibold text-dark-300 mb-2">{title}</h3>
      <p className="text-sm text-dark-500 max-w-md mx-auto mb-4">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

